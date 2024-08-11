import { AssignRoleDto } from '../dtos/users/assignRoleDto';
import { ChangePasswordDto } from '../dtos/users/changePasswordDto';
import { SignInDto } from '../dtos/users/signInDto';
import { SignUpDto } from '../dtos/users/signUpDto';
import BaseService from './_base.service';

const AuthService = {
    signIn: async (dto: SignInDto) => await BaseService.post('/auth/sign-in', dto),
    signUp: async (dto: SignUpDto) => await BaseService.post('/auth/sign-up', dto),
    assignRole: async (dto: AssignRoleDto) => await BaseService.put(`/auth/assign-role`, dto),
    changePassword: async (dto: ChangePasswordDto) => await BaseService.put(`/auth/change-password`, dto),
}

export default AuthService;