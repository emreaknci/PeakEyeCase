import { Box, Typography, Divider, Grid, Button, FormHelperText } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { CommentDto } from '../../../dtos/comments/commentDto';
import { CommentCreationDto } from '../../../dtos/comments/commentCreationDto';
import CustomTextAreaComponent from '../../common/CustomTextAreaComponent';
import DialogComponent from '../../common/DialogComponent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import CommentService from '../../../services/comment.service';


const validationSchema = Yup.object({
    text: Yup.string().required('Comment content is required.'),
});

const Comments = ({ blogId }: { blogId: number }) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState<number>(0);

    useEffect(() => {
        CommentService.getAllByBlogId(blogId).then(response => {
            console.log(response.data.data);
            setComments(response.data.data);
        })
    }, [blogId]);

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const dto: CommentCreationDto = {
                authorId: authContext.currentUserId || 0,
                blogId: blogId,
                content: values.text,
            }
            console.log(dto);

            CommentService.create(dto).then((response) => {
                formik.resetForm();
                setComments([response.data.data, ...comments]);
            }).catch((error) => {
                toast.error("An error occurred while creating the comment.");
            });
        },
    });

    const handleDeleteComment = async (commentId: number) => {
        setOpenAlert(true);
        setCurrentCommentId(commentId);
    }

    const handleConfirm = async () => {
        CommentService.delete(currentCommentId).then(() => {
            const remainingComments = comments.filter((comment) => comment.id !== currentCommentId);
            setComments(remainingComments);
            setCurrentCommentId(0);
            setOpenAlert(false);
        });
    }

    return (
        <>
            <Typography variant="h6" fontWeight={"bold"} mb={1} >
                Comments
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} >
                    {comments && comments.length === 0 && (
                        <Typography variant="body1" color="textSecondary">
                            There are no comments yet. Be the first to comment.
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomTextAreaComponent fieldName="text" formik={formik}
                            disabled={!authContext.isAuthenticated}
                            label={authContext.isAuthenticated ? "You can write your comment here" : "You must login to write a comment"}
                        />
                        <FormHelperText sx={{ color: "red" }}>{formik.touched.text && formik.errors.text}</FormHelperText>

                        <Button variant="text" fullWidth sx={{ borderRadius: 3, }} color="inherit" onClick={() => formik.handleSubmit()}>
                            Share
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12}  >
                    {comments && comments.map((comment, index) => (
                        <Box key={index} mb={2} mt={2}>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="text" color="error"
                                    disabled={authContext.currentUserId !== comment.authorId} onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                            </Typography>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {comment.content}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {comment.createdAt}
                                </Typography>
                                <Typography sx={{
                                    cursor: "pointer", ":hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                                    variant="subtitle2" color="textSecondary" onClick={() => { navigate(`/author/${comment.authorId}`) }}>
                                    {comment.authorFullName}
                                </Typography>
                            </div>
                            <Divider style={{ marginTop: "1rem" }} />
                        </Box>
                    ))}
                </Grid>
                {openAlert && (
                    <DialogComponent
                        open={openAlert}
                        handleClose={() => setOpenAlert(false)}
                        handleConfirm={async () => await handleConfirm()}
                        text={"Are you sure you want to delete this comment?"}
                    />
                )}
            </Grid>
        </>)
}

export default Comments