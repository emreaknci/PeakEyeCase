import { SignInDto } from '../dtos/users/signInDto';
import { SignUpDto } from '../dtos/users/signUpDto';
import BaseService from './_base.service';

const AuthService = {
    signIn: async (dto:SignInDto) => await BaseService.post('/auth/sign-in', dto),
    signUp: async (dto: SignUpDto) => await BaseService.post('/auth/sign-up', dto),
}

export default AuthService;