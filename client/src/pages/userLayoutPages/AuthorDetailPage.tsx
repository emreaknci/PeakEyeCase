import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthorDetailDto } from '../../dtos/users/authorDetailDto';
import { BlogListDto } from '../../dtos/blogs/blogListDto';
import { Grid, Paper, Typography, Avatar, IconButton, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import BlogList from '../../components/layouts/main/BlogList';
import BlogCard from '../../components/layouts/user/BlogCard';
import DialogComponent from '../../components/common/DialogComponent';
import { toast } from 'react-toastify';
import BlogService from '../../services/blog.service';
import UserService from '../../services/user.service';

const AuthorDetailPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [author, setAuthor] = useState<AuthorDetailDto | null>(null);
    const [blogs, setBlogs] = useState<BlogListDto[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [currentBlog, setCurrentBlog] = useState<BlogListDto>();


    useEffect(() => {
        if (!id) return;

        UserService.getById(Number(id)).then(response => {
            const defaultSocialLinks: string[] = ['https://www.facebook.com/', 'https://www.twitter.com/',];
            const data = response.data.data as AuthorDetailDto;
            data.socialLinks = defaultSocialLinks
            setAuthor(data);
        });

        BlogService.getAllByAuthorId(id).then(response => {
            setBlogs(response.data.data);
        });


    }, [id]);

    const handleDeleteBlog = (blog: BlogListDto) => {
        setOpenAlert(true);
        setAlertText(`Are you sure you want to delete blog '${blog.title}'?`);
        setCurrentBlog(blog);
    }

    const handleDeleteBlogConfirm = async () => {
        if (!currentBlog || !blogs) return;

        toast.dismiss();
        BlogService.delete(currentBlog.id).then(() => {
            const filteredBlogs = blogs.map((b) => {
                if (b.id === currentBlog.id) {
                    b.isDeleted = true;
                }
                return b;
            });
            setBlogs(filteredBlogs);
        })
        setOpenAlert(false);
    }

    const handleChangeVisibility = (blog: BlogListDto) => {
        if (!blogs) return;
        toast.dismiss();
        BlogService.changeVisibility(blog.id).then(() => {
            const updatedBlogs = blogs.map((b) => {
                if (b.id === blog.id) {
                    b.isHidden = !b.isHidden;
                }
                return b;
            });
            setBlogs(updatedBlogs);
        })
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography variant="h4">Author Informations</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ textAlign: 'center', px: { xl: 30, lg: 20, md: 10, sm: 5 }, py: 5, borderRadius: 3 }}>
                        {author && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar alt={author.fullName} style={{ width: '5rem', height: '5rem', marginRight: '1rem' }} />
                                    <div>
                                        <Typography variant="h5">{author.fullName}</Typography>
                                        <Typography variant="subtitle1" color="textSecondary">{author.jobTitle}</Typography>
                                    </div>
                                </div>
                                <Typography variant="body1" style={{ margin: '20px 0' }}>{author.about}</Typography>
                                <div>
                                    {author.socialLinks && author.socialLinks.map((link, index) => (
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

                <Grid item sm={9}>
                    <Typography variant="h5">Blogs</Typography>
                </Grid>
                <Grid item sm={3} textAlign={"end"}>
                    <Typography sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        variant="h5" onClick={() => navigate(`/me/authors/${author?.fullName}/comments`)}>
                        View Comments
                    </Typography>
                </Grid>

                <Grid item sm={12} md={6} lg={4} >
                    {blogs && blogs.length > 0 ? <>
                        {blogs?.map((blog, i) => (
                            <BlogCard key={i} blog={blog} handleDeleteBlog={handleDeleteBlog} handleChangeVisibility={handleChangeVisibility} isOwner={true} />
                        ))}
                    </>
                        :
                        <Typography variant='h6'>No blogs found</Typography>
                    }

                </Grid>
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
