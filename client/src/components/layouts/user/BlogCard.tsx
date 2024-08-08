import { Box, Button, Card, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import { BlogListDto } from '../../../dtos/blogs/blogListDto'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryButton from '../main/CategoryButton'


export interface BlogCardProps {
    blog: BlogListDto,
    isOwner: boolean,
    handleDeleteBlog: (blog: BlogListDto) => void,
}


const BlogCard = (props: BlogCardProps) => {
    const navigate = useNavigate()

    const handleVisibilityChange = () => {
        toast.dismiss()
        toast.info("Blog visibility is changed")
    }

    const title = props.blog.title.length > 50 ? props.blog.title.substring(0, 50) + '...' : props.blog.title

    return (
        <Card variant="outlined" sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>

            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" color="green">Active</Typography>
                    <CategoryButton name={props.blog.categoryName} id={props.blog.categoryId} />
                </Box>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <Button variant="text" color="inherit" onClick={() => { navigate(`/author/${props.blog.authorId}`) }}>View Public Profile</Button>
                    <Button variant="text" color="inherit" onClick={() => { navigate(`/blog/${props.blog.id}`) }}>View Blog</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                    {props.isOwner && <>
                        <Button variant="text" color="inherit" onClick={() => { navigate(`/me/my-blogs/edit-blog/${props.blog.id}`) }}>Edit </Button>
                        <Button variant="text" color="warning" onClick={handleVisibilityChange}>Change Visibility</Button>
                    </>}
                    <Button variant="text" color="error" onClick={() => props.handleDeleteBlog(props.blog)}>Delete</Button>
                </Box>

                <Box sx={{ marginTop: 1 }}>
                    <Typography variant="body2">
                        <b>Created At:</b> {props.blog.createdAt.toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BlogCard