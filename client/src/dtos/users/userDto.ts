import { Role } from "../../models/role";

export interface UserDto {
    id: number;
    fullName: string;
    jobTitle: string;
    email: string;
    about?: string;
    role: Role;
}