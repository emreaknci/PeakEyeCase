import React, { useEffect } from 'react'
import BlogCard from '../../components/layouts/main/BlogCard'
import { Button, Grid, useTheme } from '@mui/material'
import { BlogListDto } from '../../dtos/blogListDto'
import Loading from '../../components/common/Loading'

const HomePage = () => {
  const theme=useTheme();
  const [blogs, setBlogs] = React.useState<BlogListDto[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);


  const addBlogs = () => {
    setLoading(true)
    setTimeout(() => {
      const newBlogs: BlogListDto[] = []
      for (let i = 0; i < 2; i++) {
        const blog: BlogListDto = {
          id: 1,
          title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
          imageUri: 'https://etgtemizlik.com/yp/images/hizmet/default.png',
          createdAt: new Date(),
          categoryId: 1, categoryName: 'Technology',
          writerId: 1, writerFullName: 'John Doe',
          writerImageUri: 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png',
        }
        newBlogs.push(blog)
      }
      setBlogs([...blogs, ...newBlogs])
      setLoading(false)
    }, 1);

  }

  // useEffect(() => {
  //   addBlogs()
  // }, [])




  return (
    <>
      {loading ?
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </Grid> :
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} md={4} >
            <BlogCard />
          </Grid>
          {/* {blogs.map((blog, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} >
              <BlogCard />
            </Grid>
          ))} */}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='outlined' sx={{
              bgcolor: "transparent", color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                border: `1px solid ${theme.palette.divider}`,
              }
            }} >
              Load More
            </Button>
          </Grid>
        </Grid>
      }

    </>
  )
}

export default HomePage