
import { CategoryCreationDto } from '../dtos/categories/categoryCreationDto';
import BaseService from './_base.service';

const CategoryService = {
    getAll: async () => await BaseService.get('/category'),
    getById: async (id: string) => await BaseService.get(`/category/${id}`),
    create: async (dto: CategoryCreationDto) => await BaseService.post('/category', dto),
}

export default CategoryService;