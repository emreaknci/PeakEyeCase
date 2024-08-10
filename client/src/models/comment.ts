import { BaseModel } from "./baseModel";

export interface Comment extends BaseModel{
    content: string;
    authorId: number;
    blogId: number;
}