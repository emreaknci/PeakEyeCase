export interface CommentDto {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    authorFullName: string;
    blogId: number;
    blogTitle?: string;
}