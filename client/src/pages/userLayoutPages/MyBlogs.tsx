import React, { useEffect, useState } from 'react'
import { BlogListDto } from '../../dtos/blogListDto'
import BlogCard from '../../components/layouts/user/BlogCard'
import { Grid, Typography } from '@mui/material'
import DialogComponent from '../../components/common/DialogComponent'
import { toast } from 'react-toastify'

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<BlogListDto[]>([])
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [currentBlog, setCurrentBlog] = useState<BlogListDto>();


    useEffect(() => {
        const blog: BlogListDto = {
            id: 1,
            title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
            imageUri: 'https://i.pinimg.com/originals/0d/84/8c/0d848c32d1181011fba9fec18e461531.jpg',
            createdAt: new Date(),
            categoryId: 1, categoryName: 'Technology',
            authorId: 1, authorFullName: 'John Doe',
            authorImageUri: 'https://e7.pngegg.com/pngimages/348/800/png',
            isDeleted: false,
            isHidden: false,
        };

        setBlogs([blog, blog, blog, blog, blog, blog, blog, blog]);
    }, [])

    const handleDeleteBlog = (blog: BlogListDto) => {
        setOpenAlert(true);
        setAlertText(`Are you sure you want to delete blog '${blog.title}'?`);
        setCurrentBlog(blog);
    }

    const handleDeleteBlogConfirm = async () => {
        toast.dismiss();
        toast.success(`Blog '${currentBlog?.title}' deleted successfully!`);
        setOpenAlert(false);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant="h4">My Blogs</Typography>
                </Grid>
                {blogs.map((blog, i) => (
                    <Grid item sm={12} md={6} lg={4} key={i}>
                        <BlogCard blog={blog} handleDeleteBlog={handleDeleteBlog} />
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