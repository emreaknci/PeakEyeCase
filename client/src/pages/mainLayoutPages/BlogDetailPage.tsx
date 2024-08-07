import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BlogDetailDto } from '../../dtos/blogDetailDto';
import Loading from '../../components/common/Loading';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import CategoryButton from '../../components/layouts/main/CategoryButton';

const BlogDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogDetailDto | null>(null);
  const { id } = useParams();

  const getBlogById = async () => {
    setBlog({
      id: 1,
      title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
      imageUri: 'https://i.pinimg.com/originals/0d/84/8c/0d848c32d1181011fba9fec18e461531.jpg',
      createdAt: new Date(),
      categoryId: 1, categoryName: 'Technology',
      authorId: 1, authorFullName: 'John Doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque saepe culpa incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque saepe culpa incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque saepe culpa incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque saepe culpa incidunt.'
    })

  }

  useEffect(() => {
    getBlogById()
  }, [id])

  return (
    <>
      {loading ? <Loading /> :
        <>
          {blog && <Grid container>
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
                <CardMedia component="img" image={blog.imageUri}
                  sx={{ width: 40, height: 40, borderRadius: '50%', mb: { xs: 1, sm: 0 }, mr: { sm: 2 } }}
                />
                <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                  {blog.authorFullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.createdAt.toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <CardMedia component="img"
                image={blog.imageUri} alt={blog.title}
                sx={{
                  width: '100%', objectFit: 'fill',
                  height: { xs: '200px', sm: 'auto' },
                  borderRadius: 3, mt: 3
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}
                dangerouslySetInnerHTML={{
                  __html: `
                <div>
                  
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non bibendum nisi. Ut condimentum, purus nec facilisis cursus, risus eros vehicula velit, vel tincidunt lacus eros id eros. Nulla facilisi. Proin pretium velit at dolor interdum, a viverra urna fermentum. Integer id purus nec turpis elementum pellentesque.</p>
                  
                  <h4>Heading 2</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non bibendum nisi. Ut condimentum, purus nec facilisis cursus, risus eros vehicula velit, vel tincidunt lacus eros id eros. Nulla facilisi. Proin pretium velit at dolor interdum, a viverra urna fermentum. Integer id purus nec turpis elementum pellentesque.</p>

                  <h4>Heading 3</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non bibendum nisi. Ut condimentum, purus nec facilisis cursus, risus eros vehicula velit, vel tincidunt lacus eros id eros. Nulla facilisi. Proin pretium velit at dolor interdum, a viverra urna fermentum. Integer id purus nec turpis elementum pellentesque.</p>

                  <h4>Heading 4</h4>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non bibendum nisi. Ut condimentum, purus nec facilisis cursus, risus eros vehicula velit, vel tincidunt lacus eros id eros. Nulla facilisi. Proin pretium velit at dolor interdum, a viverra urna fermentum. Integer id purus nec turpis elementum pellentesque.</p>
                 </div>` }}>
              </Typography>

            </Grid>
          </Grid>
          }
        </>
      }


    </>
  )
}

export default BlogDetailPage