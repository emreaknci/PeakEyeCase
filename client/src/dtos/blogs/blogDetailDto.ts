export interface BlogDetailDto {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    categoryName: string;
    createdAt: string;
    imageUri: string;
    authorFullName: string;
    authorId: number;
    isDeleted: boolean;
    isHidden: boolean;
}