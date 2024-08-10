
import { BlogCreationDto } from '../dtos/blogs/blogCreationDto';
import { BlogEditDto } from '../dtos/blogs/blogEditDto';
import BaseService from './_base.service';

const BlogService = {
    getAll: async () => await BaseService.get('/blog'),
    getMyBlogs: async () => await BaseService.get('/blog/my-blogs'),
    getAllByAuthorId: async (authorId: string) => await BaseService.get(`/blog/get-all-by-author-id/${authorId}`),
    getById: async (id: string) => await BaseService.get(`/blog/get-by-id/${id}`),
    get: async (id: string) => await BaseService.get(`/blog/${id}`),
    create: async (dto: BlogCreationDto) => await BaseService.post('/blog', dto),
    update: async (dto:BlogEditDto) => await BaseService.put(`/blog`, dto),
    delete: async (id: string) => await BaseService.delete(`/blog/${id}`),
}

export default BlogService;