import { Box, Button, Paper, Typography } from '@mui/material'
import { BlogListDto } from '../../../dtos/blogListDto'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryButton from '../main/CategoryButton'


export interface BlogCardProps {
    blog: BlogListDto,
    handleDeleteBlog: (blog: BlogListDto) => void
}


const BlogCard = (props: BlogCardProps) => {
    const navigate = useNavigate()

    const handleVisibilityChange = () => {
        toast.dismiss()
        toast.info("Blog visibility is changed")
    }

    return (
        <Paper variant="outlined" sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="green">Active</Typography>
                <CategoryButton name={props.blog.categoryName} id={props.blog.categoryId} />
            </Box>
            <Typography variant="h6">{props.blog.title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="text" color="info" onClick={() => { navigate(`/author/${props.blog.authorId}`) }}>View Author</Button>
                <Button variant="text" color="info" onClick={() => { navigate(`/blog/${props.blog.id}`) }}>View Blog</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="text" color="error" onClick={() => props.handleDeleteBlog(props.blog)}>Delete</Button>
                <Button variant="text" color="warning" onClick={handleVisibilityChange}>Change Visibility</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                    <b>Created At:</b> {props.blog.createdAt.toLocaleDateString()}
                </Typography>
            </Box>
        </Paper>
    )
}

export default BlogCard