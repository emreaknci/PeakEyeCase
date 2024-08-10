import React, { useContext, useEffect } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { BlogListDto } from '../../dtos/blogs/blogListDto'
import Loading from '../../components/common/Loading'
import AdsComponent from '../../components/common/AdsComponent'
import { CustomThemeContext } from '../../contexts/CustomThemeContext'
import CategoryButton from '../../components/layouts/main/CategoryButton'
import { useNavigate, useParams } from 'react-router-dom'
import BlogList from '../../components/layouts/main/BlogList'
import { Category } from '../../models/category'
import CategoryService from '../../services/category.service'
import { toast } from 'react-toastify'


const FeaturedBlog = ({ blog }: { blog: BlogListDto }) => {
  const themeContext = useContext(CustomThemeContext);
  const navigate = useNavigate()

  return (
    <Box sx={{
      position: 'relative', width: '100%',
      height: 'auto', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
    }}>
      <CardMedia component="img"
        image={blog.imageUri} alt={blog.title}
        sx={{
          width: '100%', objectFit: 'overflow',
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: 3,
        }}
      />
      <Card variant='outlined'
        sx={{
          position: 'absolute', bottom: { xs: -10, sm: -30 },
          left: { xs: 10, sm: 20 }, padding: 2,
          boxShadow: 3, border: "none", borderRadius: 2,
          width: { xs: '90%', sm: '40%' },
          bgcolor: 'background.default',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <CardContent sx={{ px: 0 }}>
          <CategoryButton name={blog.categoryName} id={blog.categoryId} />
          <Typography variant="h6" component="div" onClick={() => { navigate(`/blog/${blog.id}`) }}
            sx={{
              cursor: 'pointer', color: 'text.primary',
              fontWeight: 'bold', mt: 1
            }}>
            {blog.title}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia component="img" image={blog.authorImageUri} onClick={() => { navigate(`/author/${blog.authorId}`) }}
            sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2, cursor: 'pointer' }}
          />
          <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1, cursor: 'pointer', }} onClick={() => { navigate(`/author/${blog.authorId}`) }}>
            {blog.authorFullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.createdAt.toLocaleDateString()}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

const HomePage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { id } = useParams()
  const [category, setCategory] = React.useState<Category | null>(null)
  const [blogs, setBlogs] = React.useState<BlogListDto[]>([]);
  const [featuredBlog, setFeaturedBlog] = React.useState<BlogListDto | null>(null);

  useEffect(() => {
    const blog: BlogListDto = {
      id: 1,
      title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
      imageUri: 'https://marketplace.canva.com/EAFHNkHvFsA/1/0/1600w/canva-grey-minimalist-tips-blog-banner-yR0ULIwVxyE.jpg',
      createdAt: new Date(),
      categoryId: 1, categoryName: 'Technology',
      authorId: 1, authorFullName: 'John Doe',
      authorImageUri: 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png',
      isDeleted: false,
      isHidden: false,
    }
    setFeaturedBlog(blog)
    setBlogs([blog, blog, blog, blog, blog, blog, blog, blog, blog])
  }, [])

  useEffect(() => {
    if (id) {
      CategoryService.getById(id).then(response => {
        setCategory(response.data.data)
        setLoading(false)
      })
    }
  }, [id])

  return (
    <>
      {loading ?
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </Grid> :
        <>
          {id && category && <Typography variant='h6' sx={{ fontWeight: 'bold', textAlign: 'center', my: 2 }}>
            Category: {category.name} Blogs
          </Typography>}
          {featuredBlog && <FeaturedBlog blog={featuredBlog} />}
          <AdsComponent />
          <BlogList title='Latest Blogs' blogs={blogs} showLoadMoreButton={true} />
          <AdsComponent />
        </>
      }

    </>
  )
}

export default HomePage