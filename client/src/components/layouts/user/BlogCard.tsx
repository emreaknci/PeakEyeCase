import { Box, Button, Paper, Typography } from '@mui/material'
import { BlogListDto } from '../../../dtos/blogListDto'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryButton from '../main/CategoryButton'

const BlogCard = ({ blog }: { blog: BlogListDto }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        toast.dismiss()
        toast.success("Blog is deleted successfully")
    }

    const handleVisibilityChange = () => {
        toast.dismiss()
        toast.info("Blog visibility is changed")
    }

    return (
        <Paper variant="outlined" sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="green">Active</Typography>
                <CategoryButton name={blog.categoryName} id={blog.categoryId} />
            </Box>
            <Typography variant="h6">{blog.title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="text" color="info" onClick={() => { navigate(`/author/${blog.authorId}`) }}>View Author</Button>
                <Button variant="text" color="info" onClick={() => { navigate(`/blog/${blog.id}`) }}>View Blog</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="text" color="error"  onClick={handleDelete}>Delete</Button>
                <Button variant="text" color="warning" onClick={handleVisibilityChange}>Change Visibility</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                    <b>Created At:</b> {blog.createdAt.toLocaleDateString()}
                </Typography>
            </Box>
        </Paper>
    )
}

export default BlogCard