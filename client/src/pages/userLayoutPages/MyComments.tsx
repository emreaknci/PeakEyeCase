import { Grid, Typography, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Comments from '../../components/layouts/user/Comments'
import { CommentDto } from '../../dtos/comments/commentDto'
import CommentService from '../../services/comment.service'
import { AuthContext } from '../../contexts/AuthContext'

const MyComments = () => {
    const authContext = useContext(AuthContext);
    const [comments, setComments] = useState<CommentDto[]>([]);

    useEffect(() => {
        if (!authContext.currentUserId) {
            return;
        }
        CommentService.getAllByAuthorId(authContext.currentUserId).then(response => {
            setComments(response.data.data);
        })

    }, [authContext.currentUserId])

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