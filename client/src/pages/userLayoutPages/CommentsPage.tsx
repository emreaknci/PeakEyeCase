import { Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CommentDto } from '../../dtos/comments/commentDto';
import SearchIcon from '@mui/icons-material/Search';
import Comments from '../../components/layouts/user/Comments';
import { useParams } from 'react-router-dom';
import CommentService from '../../services/comment.service';

const CommentsPage = () => {
    const { name } = useParams();
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [filteredComments, setFilteredComments] = useState<CommentDto[]>([]);
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e: any) => setSearchText(e.target.value);

    useEffect(() => {
        CommentService.getAll().then(response => {
            setComments(response.data.data);
        })
       
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
                        label="Search by ID, Author, Blog Title, Comment Content"
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