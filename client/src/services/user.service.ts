import BaseService from './_base.service';

const UserService = {
    getById: async (id:string) => await BaseService.get(`/user/get-by-id/${id}`),
    getAll: async () => await BaseService.get('/user'),
    getByRole: async (roleValue:number) => await BaseService.get(`/user/get-by-role/${roleValue}`),
}

export default UserService;