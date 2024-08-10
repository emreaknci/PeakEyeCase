import { BaseModel } from "./baseModel";

export interface Blog extends BaseModel {
    title: string;
    content: string;
    categoryId: number;
    imageUri: string;
    authorId: number;
    isHidden: boolean;
}