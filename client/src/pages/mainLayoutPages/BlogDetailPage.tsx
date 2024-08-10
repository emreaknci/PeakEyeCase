import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BlogDetailDto } from '../../dtos/blogs/blogDetailDto';
import Loading from '../../components/common/Loading';
import { Avatar, Box, Button, CardMedia, Divider, Grid, Typography } from '@mui/material';
import CategoryButton from '../../components/layouts/main/CategoryButton';
import Comments from '../../components/layouts/main/Comments';
import BlogService from '../../services/blog.service';

const BlogDetailPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogDetailDto | null>(null);
  const { id } = useParams();


  useEffect(() => {
    const getBlogById = async () => {
      setLoading(true);
      BlogService.getById(id!).then(response => {
        console.log(response.data.data.content)
        setBlog(response.data.data)
      }).finally(() => {
        setLoading(false)
      })


    }
    if (!id) return;

    getBlogById();


  }, [id])

  return (
    <>
      {loading ? <Loading /> :
        <>
          {blog ? <Grid container>
            <Grid item xs={12}>
              <CategoryButton name={blog.categoryName} id={blog.categoryId} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                {blog.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, flexDirection: "row" }}>
                <Avatar alt={blog.authorFullName} onClick={() => { navigate(`/author/${blog.authorId}`) }}
                  sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2, cursor: 'pointer', backgroundColor: 'primary.main' }}
                />
                <Typography variant="body2" color="text.primary"
                  sx={{
                    flexGrow: 1,
                    cursor: 'pointer',
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                  onClick={() => navigate(`/author/${blog.authorId}`)}
                >
                  {blog.authorFullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.createdAt}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <CardMedia component="img" image={import.meta.env.VITE_IMAGE_URL + "/" + blog.imageUri} alt={blog.title}
                sx={{ width: '100%', objectFit: 'fill', height: { xs: '100px', sm: 'auto' }, borderRadius: 3, mt: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textPrimary" dangerouslySetInnerHTML={{ __html: `${blog.content}` }}>
              </Typography>

            </Grid>
            <Grid item xs={12}> <Divider /><br /></Grid>
            <Grid item xs={12}>
              <Comments blogId={blog.id} />
            </Grid>
          </Grid>
            : <>
              <Typography variant='h4'>Blog not found</Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/')} style={{ marginTop: 20 }}            >
                Go to Home
              </Button>
            </>
          }
        </>
      }


    </>
  )
}

export default BlogDetailPage