export interface BlogListDto {
    id: number;
    title: string;
    categoryId: number;
    categoryName: string;
    categoryIsDeleted: boolean;
    createdAt: string;
    imageUri: string;
    authorFullName: string;
    authorId: number;
    authorImageUri: string;
    isDeleted: boolean;
    isHidden: boolean;
}