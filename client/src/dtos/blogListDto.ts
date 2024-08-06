export interface BlogListDto {
    id: number;
    title: string;
    categoryId: number;
    categoryName: string;
    createdAt: Date;
    imageUri: string;
    writerFullName: string;
    writerId: number;
    writerImageUri: string;
}