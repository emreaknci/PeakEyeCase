import React, { useEffect, useState } from 'react'
import { BlogListDto } from '../../dtos/blogListDto'
import BlogCard from '../../components/layouts/user/BlogCard'
import { Grid, Typography } from '@mui/material'

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<BlogListDto[]>([])

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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant="h4">My Blogs</Typography>
                </Grid>
                {blogs.map((blog, i) => (
                    <Grid item sm={12} md={6} key={i}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}

            </Grid>
        </>
    )
}

export default MyBlogs