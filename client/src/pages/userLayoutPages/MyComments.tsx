import { Grid, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Comments from '../../components/layouts/user/Comments'
import { CommentDto } from '../../dtos/comments/commentDto'

const MyComments = () => {
    const [comments, setComments] = useState<CommentDto[]>([]);

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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={12} sm={9}> <Typography variant='h4'>My Comments</Typography> </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <Comments comments={comments} setComments={setComments} isMyComments={true} />
        </>
    )
}

export default MyComments