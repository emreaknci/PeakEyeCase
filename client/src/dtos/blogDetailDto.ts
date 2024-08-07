export interface BlogDetailDto {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    categoryName: string;
    createdAt: Date;
    imageUri: string;
    authorFullName: string;
    authorId: number;
}