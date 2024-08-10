import { BaseModel } from "./baseModel";
import { Role } from "./role";

export interface User extends BaseModel {
    fullName: string;
    jobTitle: string;
    email: string;
    role: Role;
    about?: string;
}