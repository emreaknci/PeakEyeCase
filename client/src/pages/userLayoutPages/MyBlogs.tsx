import React, { useEffect, useState } from 'react'
import { BlogListDto } from '../../dtos/blogs/blogListDto'
import BlogCard from '../../components/layouts/user/BlogCard'
import { Button, Grid, Typography } from '@mui/material'
import DialogComponent from '../../components/common/DialogComponent'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import BlogService from '../../services/blog.service'

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<BlogListDto[]>([])
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [currentBlog, setCurrentBlog] = useState<BlogListDto>();

    const navigate = useNavigate();

    useEffect(() => {
        BlogService.getMyBlogs().then((response) => {
            setBlogs(response.data.data);
        })
    }, [])

    const handleDeleteBlog = (blog: BlogListDto) => {
        const title = blog.title.length > 50 ? blog.title.substring(0, 50) + '...' : blog.title

        setOpenAlert(true);
        setAlertText(`Are you sure you want to delete blog '${title}' ?`);
        setCurrentBlog(blog);
    }

    const handleDeleteBlogConfirm = async () => {
        const title = (currentBlog?.title.length ?? 0) > 50 ? currentBlog?.title.substring(0, 50) + '...' : currentBlog?.title

        toast.dismiss();
        toast.success(`Blog '${title}' deleted successfully!`);
        setOpenAlert(false);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={12} sm={9}>  <Typography variant='h4'>My Blogs</Typography> </Grid>
                        <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                            <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                                color="primary" onClick={() => navigate("/me/my-blogs/add-new-blog")}>
                                Add New Blog
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {blogs?.map((blog, i) => (
                    <Grid item sm={12} md={6} lg={4} key={i}>
                        <BlogCard blog={blog} handleDeleteBlog={handleDeleteBlog} isOwner={true} />
                    </Grid>
                ))}

            </Grid>
            {openAlert && (
                <DialogComponent
                    title='Caution'
                    open={openAlert}
                    handleClose={() => setOpenAlert(false)}
                    handleConfirm={async () => await handleDeleteBlogConfirm()}
                    text={alertText}
                />
            )}
        </>
    )
}

export default MyBlogs