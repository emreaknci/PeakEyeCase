import { Card, CardMedia, CardContent, Typography, Button, Box, Avatar } from '@mui/material'
import { BlogListDto } from '../../../dtos/blogs/blogListDto'
import CategoryButton from './CategoryButton'
import { useNavigate } from 'react-router-dom'

export interface BlogCardProps {
    blog: BlogListDto
}

const BlogCard = (props: BlogCardProps) => {
    const navigate = useNavigate()

    const blogTitle = (title: string) => {
        if (title.length > 70) {
            return title.substring(0, 70) + '...'
        }
        return title
    }
    return (
        <Card variant='outlined'
            sx={{
                bgcolor: 'background.default', p: 2,
                display: 'flex', flexDirection: 'column',
            }}>
            <CardMedia component={'img'} image={import.meta.env.VITE_IMAGE_URL + "/" + props.blog.imageUri} alt={props.blog.title}
                sx={{ height: 150, borderRadius: 1 }} />
            <CardContent sx={{ px: 0 }}>
                <CategoryButton name={props.blog.categoryName} id={props.blog.categoryId} />
                <Typography variant="h6" component="div" onClick={() => { navigate(`/blog/${props.blog.id}`) }}
                    sx={{
                        cursor: 'pointer', color: 'text.primary',
                        fontWeight: 'bold', mt: 1
                    }}>
                    {blogTitle(props.blog.title)}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <Avatar alt={props.blog.authorFullName} src={props.blog.authorImageUri} onClick={() => { navigate(`/author/${props.blog.authorId}`) }}
                    sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2, cursor: 'pointer', backgroundColor: 'primary.main' }}
                />
                <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1, cursor: 'pointer', }} onClick={() => { navigate(`/author/${props.blog.authorId}`) }}>
                    {props.blog.authorFullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.blog.createdAt}
                </Typography>
            </Box>
        </Card>

    )
}

export default BlogCard