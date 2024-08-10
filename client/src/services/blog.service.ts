
import { BlogCreationDto } from '../dtos/blogs/blogCreationDto';
import { BlogEditDto } from '../dtos/blogs/blogEditDto';
import BaseService from './_base.service';

const BlogService = {
    getAll: async () => await BaseService.get('/blog'),
    getAllByCategoryId: async (categoryId: string) => await BaseService.get(`/blog/get-by-category/${categoryId}`),
    getMyBlogs: async () => await BaseService.get('/blog/my-blogs'),
    getAllByAuthorId: async (authorId: string) => await BaseService.get(`/blog/get-all-by-author-id/${authorId}`),
    getById: async (id: string) => await BaseService.get(`/blog/get-by-id/${id}`),
    get: async (id: string) => await BaseService.get(`/blog/${id}`),
    create: async (formData: FormData) => await BaseService.post('/blog', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    update: async (dto: BlogEditDto) => await BaseService.put(`/blog`, dto),
    delete: async (id: string) => await BaseService.delete(`/blog/${id}`),
}

export default BlogService;