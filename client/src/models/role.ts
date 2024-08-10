export enum Role {
    Admin = 1,
    Author = 2
}

export const RoleToString = (role: Role) => {
    switch (role) {
        case Role.Admin:
            return "Admin";
        case Role.Author:
            return "Author";
        default:
            return "Unknown";
    }
}

export const RoleToValue = (role: Role) => {
    switch (role) {
        case Role.Admin:
            return 1;
        case Role.Author:
            return 2;
        default:
            return 0;
    }
}