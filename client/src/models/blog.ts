import { Category } from "./category";
import { User } from "./user";

export interface Blog {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    category: Category;
    createdAt: Date;
    imageUri: string;
    author: User;
    authorId: number;
    isDeleted: boolean;
    isHidden: boolean;
}