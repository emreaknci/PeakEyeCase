import React, { useContext, useEffect } from 'react'
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
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
import BlogService from '../../services/blog.service'
import { SearchContext } from '../../contexts/SearchTermContext'


const FeaturedBlog = ({ blog }: { blog: BlogListDto }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CardMedia component="img"
        image={import.meta.env.VITE_IMAGE_URL + "/" + blog.imageUri} alt={blog.title}
        sx={{
          width: '100%', objectFit: 'cover',
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: 3,
          cursor: 'pointer'
        }}
        onClick={() => { navigate(`/blog/${blog.id}`) }}
      />
      <Card variant='outlined'
        sx={{
          position: 'absolute', bottom: { xs: -10, sm: -30 },
          left: { xs: 10, sm: 30 }, padding: 2,
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
          <Avatar alt={blog.authorFullName} onClick={() => { navigate(`/author/${blog.authorId}`) }}
            sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2, cursor: 'pointer', backgroundColor: 'primary.main' }}
          />
          <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1, cursor: 'pointer', }} onClick={() => { navigate(`/author/${blog.authorId}`) }}>
            {blog.authorFullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.createdAt}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

const HomePage = () => {
  const searchContext = useContext(SearchContext)
  const [loading, setLoading] = React.useState<boolean>(false);
  const { id } = useParams()
  const [category, setCategory] = React.useState<Category | null>(null)
  const [blogs, setBlogs] = React.useState<BlogListDto[]>([]);
  const [featuredBlog, setFeaturedBlog] = React.useState<BlogListDto | null>(null);
  const [searched, setSearched] = React.useState<boolean>(false)

  const setData = (blogs: BlogListDto[]) => {
    const featuredBlog = blogs[0]
    setFeaturedBlog(featuredBlog)
    blogs.shift()
    setBlogs(blogs)
  }
  useEffect(() => {
    const getBlogs = () => {
      setLoading(true)
      BlogService.getAll().then(response => {
        console.log(response.data.data)
        setData(response.data.data)
        searchContext.setIsClicked(false)
      }).finally(() => {
        setLoading(false)
      })
    }

    const getBlogsByCategory = (id: string) => {
      setLoading(true)
      BlogService.getAllByCategoryId(id).then(response => {
        setData(response.data.data)
      }).finally(() => {
        setLoading(false)
      })
    }

    const getCategory = (id: string) => {
      setLoading(true)
      CategoryService.getById(id).then(response => {
        setCategory(response.data.data)
      }).finally(() => {
        setLoading(false)
      })
    }
    console.log(id)
    if (id != undefined) {
      getCategory(id)
      getBlogsByCategory(id)
    }
    else {
      getBlogs()
    }
  }, [id])

  useEffect(() => {
    if (searchContext.isClicked && searchContext.searchTerm != '') {
      setLoading(true)
      BlogService.getAll(searchContext.searchTerm).then(response => {
        setData(response.data.data)
        setSearched(true)
      }).catch(error => {
        toast.error(`No blogs found for "${searchContext.searchTerm}"`)
      }).finally(() => {
        setLoading(false)
      })

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchContext.isClicked])

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
          {searched && <Typography variant='h6' sx={{ fontWeight: 'bold', textAlign: 'center', my: 2 }}>
            Search Results for: {searchContext.searchTerm}
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