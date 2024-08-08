import { Box, Typography, Divider, Grid, Button, FormHelperText } from '@mui/material'
import { useEffect, useState } from 'react'

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { CommentDto } from '../../../dtos/comments/commentDto';
import { CommentCreationDto } from '../../../dtos/comments/commentCreationDto';
import CustomTextAreaComponent from '../../common/CustomTextAreaComponent';
import DialogComponent from '../../common/DialogComponent';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
    text: Yup.string().required('Comment content is required.'),
});

const Comments = ({ blogId }: { blogId: number }) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState<number>(0);

    useEffect(() => {
        //fetch comments

    }, [blogId]);

    const formik = useFormik({
        initialValues: {
            text: '',
            rating: 0,
            hideUserFullName: false,
        },
        validationSchema,
        onSubmit: (values) => {
            handleAddComment();
        },
    });

    const handleDeleteComment = async (commentId: number) => {
        setOpenAlert(true);
        setCurrentCommentId(commentId);
    }

    const handleAddComment = async () => {
        const dto: CommentCreationDto = {
            authorId: 1,
            blogId: blogId,
            content: formik.values.text,
        };
        toast.dismiss();

        const commentDto: CommentDto = {
            id: comments.length + 1,
            authorFullName: "John Doe",
            authorId: 1,
            blogId: 1,
            content: formik.values.text,
            createdAt: new Date(),
        };

        setComments([commentDto, ...comments]);

        formik.resetForm();

        toast.success("Comment added successfully.");

    }

    const handleConfirm = async () => {

        const remainingComments = comments.filter((comment) => comment.id !== currentCommentId);
        setComments(remainingComments);

        toast.success("Comment deleted successfully.");
        setOpenAlert(false);
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
                        <FormHelperText sx={{ color: "red" }}>{formik.touched.rating && formik.errors.rating}</FormHelperText>

                        <CustomTextAreaComponent
                            fieldName="text"
                            formik={formik}
                            // eslint-disable-next-line no-constant-condition
                            label={1 === 1 ? "You can write your comment here" : "You must login to write a comment"}
                        />
                        <FormHelperText sx={{ color: "red" }}>{formik.touched.text && formik.errors.text}</FormHelperText>

                        <Button
                            variant="text"
                            fullWidth
                            sx={{ borderRadius: 3, }}
                            color="inherit"
                            onClick={() => formik.handleSubmit()}
                        >
                            Share
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12}  >
                    {comments && comments.map((comment, index) => (
                        <Box key={index} mb={2} mt={2}>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="text" color="error" onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                            </Typography>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {comment.content}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="textSecondary">
                                     {comment.createdAt.toLocaleDateString()}
                                </Typography>
                                <Typography sx={{ cursor: "pointer", ":hover":{
                                    textDecoration:"underline"
                                } }}
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