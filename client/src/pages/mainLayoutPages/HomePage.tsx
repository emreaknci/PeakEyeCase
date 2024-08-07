import React, { useContext, useEffect } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import { BlogListDto } from '../../dtos/blogListDto'
import Loading from '../../components/common/Loading'
import AdsComponent from '../../components/common/AdsComponent'
import { CustomThemeContext } from '../../contexts/CustomThemeContext'
import CategoryButton from '../../components/layouts/main/CategoryButton'
import { useNavigate } from 'react-router-dom'
import BlogList from '../../components/layouts/main/BlogList'


const LatestBlogs = () => {
  const [blogs, setBlogs] = React.useState<BlogListDto[]>([]);

  useEffect(() => {
    const blog: BlogListDto = {
      id: 1,
      title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
      imageUri: 'https://etgtemizlik.com/yp/images/hizmet/default.png',
      createdAt: new Date(),
      categoryId: 1, categoryName: 'Technology',
      authorId: 1, authorFullName: 'John Doe',
      authorImageUri: 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png',
    }
    setBlogs([blog, blog, blog, blog, blog, blog, blog, blog, blog])
  }, [])

  return (
    <BlogList title='Latest Blogs' blogs={blogs} showLoadMoreButton={true} />
  )
}

const FeaturedBlog = () => {
  const themeContext = useContext(CustomThemeContext);
  const navigate = useNavigate()

  const blog = {
    id: 1,
    title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
    imageUri: 'https://i.pinimg.com/originals/0d/84/8c/0d848c32d1181011fba9fec18e461531.jpg',
    createdAt: new Date(),
    categoryId: 1, categoryName: 'Technology',
    authorId: 1, authorFullName: 'John Doe',
    authorImageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s',
  };

  return (
    <Box sx={{
      position: 'relative', width: '100%',
      height: 'auto', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
    }}>
      <CardMedia component="img"
        image={blog.imageUri} alt={blog.title}
        sx={{
          width: '100%', objectFit: 'fill',
          height: { xs: '200px', sm: 'auto' },
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

  return (
    <>
      {loading ?
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </Grid> :
        <>
          <FeaturedBlog />
          <AdsComponent />
          <LatestBlogs />
          <AdsComponent />
        </>
      }

    </>
  )
}

export default HomePage