export interface BlogDetailDto {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    categoryName: string;
    createdAt: Date;
    imageUri: string;
    writerFullName: string;
    writerId: number;
}