import { UserEditDto } from '../dtos/users/userEditDto';
import BaseService from './_base.service';

const UserService = {
    edit: async (dto:UserEditDto) => await BaseService.put('/user', dto), 
    getById: async (id:number) => await BaseService.get(`/user/get-by-id/${id}`),
    getAll: async () => await BaseService.get('/user'),
    getByRole: async (roleValue:number) => await BaseService.get(`/user/get-by-role/${roleValue}`),
}

export default UserService;