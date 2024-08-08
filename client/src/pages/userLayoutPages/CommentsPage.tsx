import { Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CommentDto } from '../../dtos/comments/commentDto';
import SearchIcon from '@mui/icons-material/Search';
import Comments from '../../components/layouts/user/Comments';
import { useParams } from 'react-router-dom';

const CommentsPage = () => {
    const { name } = useParams();
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [filteredComments, setFilteredComments] = useState<CommentDto[]>([]);
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e: any) => setSearchText(e.target.value);

    useEffect(() => {
        const commentDto1: CommentDto = {
            id: 1,
            authorFullName: "John Doe",
            authorId: 1,
            blogId: 1,
            blogTitle: "Title-1",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis rerum neque laboriosam quam. Adipisci vitae explicabo nihil eaque est, facilis veritatis corporis accusantium fugiat velit, beatae consequuntur suscipit ipsa labore optio, aspernatur nostrum esse incidunt illum quisquam ex nulla accusamus hic. Asperiores, earum placeat quidem soluta omnis atque dicta est?",
            createdAt: new Date(),
        };
        const commentDto2: CommentDto = {
            id: 2,
            authorFullName: "John Doe",
            authorId: 1,
            blogId: 2,
            blogTitle: "Title-2",
            content: "Lorem facilis veritatis corporis accusantium fugiat velit, beatae consequuntur suscipit ipsa labore optio, aspernatur nostrum esse incidunt illum quisquam ex nulla accusamus hic. Asperiores, earum placeat quidem soluta omnis atque dicta est?",
            createdAt: new Date(),
        };
        setComments([commentDto1, commentDto2]);
    }, [])

    useEffect(() => {
        if (!name) return;

        setSearchText(name);
    }, [name]);

    useEffect(() => {
        const filteredComments = comments?.filter((comment) => {
            const idMatch = comment.id?.toString().includes(searchText);
            const authorFullNameMatch = comment.authorFullName?.toLowerCase().includes(searchText.toLowerCase());
            const blogTitleMatch = comment.blogTitle?.toLowerCase().includes(searchText.toLowerCase());
            const commentContentMatch = comment.content?.toLowerCase().includes(searchText.toLowerCase());

            return idMatch || authorFullNameMatch || blogTitleMatch || commentContentMatch;
        });
        setFilteredComments(filteredComments);
    }, [comments, searchText]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={12} sm={9}> <Typography variant='h4'>Author Comments</Typography> </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Search by ID, Full Name or Email"
                        variant="filled" value={searchText}
                        onChange={handleSearch} size="medium"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <SearchIcon />
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <br />
            <Comments comments={filteredComments} setComments={setComments} isMyComments={false} />
        </>
    )
}

export default CommentsPage