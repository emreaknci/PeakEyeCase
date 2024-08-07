export interface AuthorDetailDto {
    id: number;
    fullName: string;
    email: string;
    createdAt: Date;
    about: string;
    imageUri: string;
    socialLinks: string[];
    jobTitle: string;
}