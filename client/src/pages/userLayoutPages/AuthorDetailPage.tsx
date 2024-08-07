import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorDetailDto } from '../../dtos/authorDetailDto';
import { BlogListDto } from '../../dtos/blogListDto';
import { Grid, Paper, Typography, Avatar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import BlogList from '../../components/layouts/main/BlogList';
import BlogCard from '../../components/layouts/user/BlogCard';
import DialogComponent from '../../components/common/DialogComponent';
import { toast } from 'react-toastify';

const AuthorDetailPage = () => {
    const { id } = useParams();

    const [author, setAuthor] = useState<AuthorDetailDto | null>(null);
    const [blogs, setBlogs] = useState<BlogListDto[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [currentBlog, setCurrentBlog] = useState<BlogListDto>();


    useEffect(() => {
        if (!id) return;
        const author: AuthorDetailDto = {
            id: parseInt(id),
            fullName: 'John Doe',
            imageUri: 'https://e7.pngegg.com/pngimages/348/800/png',
            createdAt: new Date(),
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque saepe culpa incidunt.',
            email: 'x@c.om',
            jobTitle: 'Software Developer',
            socialLinks: ['https://www.facebook.com', 'https://www.twitter.com'],
        };
        setAuthor(author);

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
    }, [id]);

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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ textAlign: 'center', px: { xl: 30, lg: 20, md: 10, sm: 5 }, py: 5,  borderRadius: 3 }}>
                        {author && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar alt={author.fullName} src={author.imageUri} style={{ width: '5rem', height: '5rem', marginRight: '1rem' }} />
                                    <div>
                                        <Typography variant="h5">{author.fullName}</Typography>
                                        <Typography variant="subtitle1" color="textSecondary">{author.jobTitle}</Typography>
                                    </div>
                                </div>
                                <Typography variant="body1" style={{ margin: '20px 0' }}>{author.about}</Typography>
                                <div>
                                    {author.socialLinks.map((link, index) => (
                                        <IconButton key={index} href={link} target="_blank" color="primary">
                                            {link.includes('facebook') && <FacebookIcon color='action' />}
                                            {link.includes('twitter') && <TwitterIcon color='action' />}
                                        </IconButton>
                                    ))}
                                </div>
                            </>
                        )}
                    </Paper>
                </Grid>

                <Grid item sm={12}>
                    <Typography variant="h4">Blogs</Typography>
                </Grid>

                {blogs?.map((blog, i) => (
                    <Grid item sm={12} md={6} lg={4} xl={3} key={i}>
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

    );
};

export default AuthorDetailPage;
