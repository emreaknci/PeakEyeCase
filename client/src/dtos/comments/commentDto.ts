export interface CommentDto {
    id: number;
    content: string;
    createdAt: Date;
    authorId: number;
    authorFullName: string;
    blogId: number;
    blogTitle?: string;
}