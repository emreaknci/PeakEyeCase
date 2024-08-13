import { Box, Button, Card, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import { BlogListDto } from '../../../dtos/blogs/blogListDto'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryButton from '../main/CategoryButton'
import BlogService from '../../../services/blog.service'


export interface BlogCardProps {
    blog: BlogListDto,
    isOwner: boolean,
    handleDeleteBlog: (blog: BlogListDto) => void,
    handleChangeVisibility: (blog: BlogListDto) => void
}


const BlogCard = (props: BlogCardProps) => {
    const navigate = useNavigate()

    const title = props.blog.title.length > 50 ? props.blog.title.substring(0, 50) + '...' : props.blog.title

    return (
        <Card variant="outlined" sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>

            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {props.blog.isDeleted ? (
                        <span style={{ color: 'red' }}>Deleted {props.blog.isDeleted}</span>
                    ) : props.blog.isHidden ? (
                        <span style={{ color: 'orange' }}>Hidden</span>
                    ) : (
                        <span style={{ color: 'green' }}>Active</span>
                    )}
                    <CategoryButton name={props.blog.categoryName} id={props.blog.categoryId} />
                </Box>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <Button variant="text" color="inherit" onClick={() => { navigate(`/author/${props.blog.authorId}`) }}>View Public Profile</Button>
                    <Button variant="text" color="inherit" disabled={props.blog.isHidden} onClick={() => { navigate(`/blog/${props.blog.id}`) }}>View Blog</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                    {props.isOwner && <>
                        <Button variant="text" color="inherit" onClick={() => { navigate(`/me/my-blogs/edit-blog/${props.blog.id}`) }}>Edit </Button>
                        <Button variant="text" color="warning" onClick={() => { props.handleChangeVisibility(props.blog) }}>Change Visibility</Button>
                    </>}
                    <Button disabled={props.blog.isDeleted} variant="text" color="error" onClick={() => props.handleDeleteBlog(props.blog)}>Delete</Button>
                </Box>

                <Box sx={{ marginTop: 1 }}>
                    <Typography variant="body2">
                        <b>Created At:</b> {props.blog.createdAt}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BlogCard