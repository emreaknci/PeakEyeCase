export interface SignUpDto {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    jobTitle: string;
    about: string;
    imageUri?: string;
}