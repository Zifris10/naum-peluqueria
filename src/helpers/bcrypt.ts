import { unauthorized } from '@hapi/boom';
import { hash, compare } from 'bcrypt';

export const convertPassword = async (password: string): Promise<string> => {
    const newPassword: string = await hash(password, 10);
    return newPassword;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<void> => {
    const matchPassword: boolean = await compare(password, hashPassword);
    if(!matchPassword) {
        throw unauthorized('Oops, lo sentimos pero la contraseña es incorrecta.');
    }
};