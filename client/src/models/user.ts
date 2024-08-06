import { Role } from "./role";

export interface User {
    id: number;
    fullName: string;
    jobTitle: string;
    email: string;
    imageUri: string;
    role: Role;
    about?: string;
}