

import { CommentCreationDto } from '../dtos/comments/commentCreationDto';
import BaseService from './_base.service';

const CommentService = {
    getAll: async () => await BaseService.get('/comment'),
    getAllByBlogId: async (id: number) => await BaseService.get(`/comment/get-all-by-blog-id/${id}`),
    getAllByAuthorId: async (id: number) => await BaseService.get(`/comment/get-all-by-author-id/${id}`),
    create: async (dto: CommentCreationDto) => await BaseService.post('/comment', dto),
    delete: async (id: number) => await BaseService.delete(`/comment/${id}`),

}

export default CommentService;