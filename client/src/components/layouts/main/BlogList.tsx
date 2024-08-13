import React from 'react'
import { BlogListDto } from '../../../dtos/blogs/blogListDto';
import { Grid, Typography } from '@mui/material';
import LoadMoreButton from '../../common/LoadMoreButton';
import BlogCard from './BlogCard';


export interface BlogListProps {
  title?: string;
  blogs: BlogListDto[];
  showLoadMoreButton?: boolean;
}

const BlogList = (props: BlogListProps) => {
  return (
    <Grid container spacing={5}>
      {props.title && <Grid item xs={12} >
        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >
          {props.title}
        </Typography>
      </Grid>}
      {props.blogs && props.blogs.length > 0 && props.blogs.map((blog, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <BlogCard blog={blog} />
        </Grid>
      ))}
      {props.blogs && props.blogs.length === 0 &&
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>
            No more blogs found. Log in or sign up to write a blog now!
          </Typography>
        </Grid>
      }


      {/* {props.showLoadMoreButton && <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton />
      </Grid>} */}
    </Grid>)
}

export default BlogList