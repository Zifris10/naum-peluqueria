import jwt from 'jsonwebtoken';
import UsersService from '../users/users.service';
import SuperAdminsService from '../superAdmins/super.admins.service';
import { Request, Response, NextFunction } from 'express';
import { UserInterface, SuperAdminInterface } from '../interfaces';
import { WhereOptions, FindOptions } from 'sequelize';
import { STATUS_CODES } from '../helpers';
import { RequestHandler } from '../handlers';

const SECRET_KEY: string = process.env.SECRET_TOKEN_JWT as string;

interface AuthorizationInterface {
    authorization: string;
}

export const jwtGenerated = (data: any, expiresIn: string): string => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn
    });
    return token;
};

export const jwtVerifyTokenSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { authorization } = req.headers as AuthorizationInterface;
        const dataToken: any = jwt.verify(authorization, SECRET_KEY);
        const { userID } = dataToken;
        const whereUser: WhereOptions<UserInterface> = {
            id: userID
        }
        const dataUser: FindOptions<UserInterface> = {
            attributes: ['id', 'name', 'email'],
            where: whereUser
        };
        const whereSuperAdmin: WhereOptions<SuperAdminInterface> = {
            userID
        }
        const dataSuperAdmin: FindOptions<SuperAdminInterface> = {
            attributes: ['id'],
            where: whereSuperAdmin
        };
        const [ getUser ] = await Promise.all([
            UsersService.findOne(dataUser),
            SuperAdminsService.findOne(dataSuperAdmin)
        ]);
        const setDataToken = {
            user: getUser
        };
        req.body.dataToken = setDataToken;
        next();
    } catch (error) {
        RequestHandler.handlerResponse(res, { statusCode: STATUS_CODES.UNAUTHORIZED, error: 'Unauthorized', message: 'Ooops, lo sentimos pero el token ha expirado.' });
    }
};