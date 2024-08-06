import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material'
import { useContext } from 'react'
import { BlogListDto } from '../../../dtos/blogListDto'
import { CustomThemeContext } from '../../../contexts/CustomThemeContext'

const BlogCard = () => {
    const themeContext = useContext(CustomThemeContext)
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
                <Button size="small" variant="contained" sx={{
                    bgcolor: themeContext.theme ? "#1b1e34" : "#f6f8ff",
                    color: themeContext.theme ? "#4561e2" : "#4B6BFB",
                    '&:hover': {
                        bgcolor: themeContext.theme ? "#1b1e34" : "#f6f8ff",
                    }
                }}>
                    {blog.categoryName}
                </Button>
                <Typography variant="h5" component="div">
                    {blogTitle(blog.title)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {blog.writerFullName}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CardMedia
                    component="img"
                    image={blog.writerImageUri}
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