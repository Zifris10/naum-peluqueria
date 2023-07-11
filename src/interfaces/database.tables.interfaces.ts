export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SuperAdminInterface {
    id: string;
    userID: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}