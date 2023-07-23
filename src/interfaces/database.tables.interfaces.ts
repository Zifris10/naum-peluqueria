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

export interface AppointmentsInterface {
    id: string;
    completed: boolean;
    startDate: Date;
    endDate: Date;
    name: string;
    phone: string;
    price: number;
    backgroundColor: string;
    createdBy: string;
    deleted: boolean;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryInterface {
    id: string;
    name: string;
    price: number;
    createdBy: string;
    deleted: boolean;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
}