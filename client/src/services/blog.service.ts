
import BaseService from './_base.service';

const BlogService = {
    getAll: async () => await BaseService.get('/blog'),
    getMyBlogs: async () => await BaseService.get('/blog/my-blogs'),
    getAllByAuthorId: async (authorId: string) => await BaseService.get(`/blog/get-all-by-author-id/${authorId}`),
    getById: async (id: string) => await BaseService.get(`/blog/${id}`),
    get: async (id: string) => await BaseService.get(`/blog/${id}`),
    create: async (data: any) => await BaseService.post('/blog', data),
    delete: async (id: string) => await BaseService.delete(`/blog/${id}`),
}

export default BlogService;