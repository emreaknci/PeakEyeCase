import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material'
import { useContext } from 'react'
import { BlogListDto } from '../../../dtos/blogListDto'
import { CustomThemeContext } from '../../../contexts/CustomThemeContext'
import CategoryButton from './CategoryButton'
import { useNavigate } from 'react-router-dom'

const BlogCard = () => {
    const navigate = useNavigate()
    const blog: BlogListDto = {
        id: 1,
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sapiente ex magnam minima nam quibusdam exercitationem eaque, saepe culpa incidunt.',
        imageUri: 'https://etgtemizlik.com/yp/images/hizmet/default.png',
        createdAt: new Date(),
        categoryId: 1, categoryName: 'Technology',
        writerId: 1, writerFullName: 'John Doe',
        writerImageUri: 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png',
    }

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
            <CardMedia component={'img'} image={blog.imageUri} sx={{ height: 150, borderRadius: 1 }} />
            <CardContent sx={{ px: 0 }}>
                <CategoryButton name={blog.categoryName} id={blog.categoryId} />
                <Typography variant="h6" component="div" onClick={() => { navigate(`/blog/${blog.id}`) }}
                    sx={{
                        cursor: 'pointer', color: 'text.primary',
                        fontWeight: 'bold', mt: 1
                    }}>
                    {blogTitle(blog.title)}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia component="img" image={blog.writerImageUri}
                    sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2 }}
                />
                <Typography variant="body2" color="text.primary" sx={{ flexGrow: 1 }}>
                    {blog.writerFullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {blog.createdAt.toLocaleDateString()}
                </Typography>
            </Box>
        </Card>

    )
}

export default BlogCard