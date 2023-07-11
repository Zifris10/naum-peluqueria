export interface StatusResponseInterface {
    statusCode: number;
    error?: string;
    message?: string;
    data?: any;
    token?: string;
    refreshToken?: string;
}