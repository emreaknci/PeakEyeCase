export interface BlogCreationDto {
    title: string;
    content: string;
    categoryId: number;
    authorId: number;
    imageUri: File | string;

}
    