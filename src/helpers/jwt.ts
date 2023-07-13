import jwt from 'jsonwebtoken';
import UsersService from '../users/users.service';
import SuperAdminsService from '../superAdmins/super.admins.service';
import { Request, Response, NextFunction } from 'express';
import { UserInterface, SuperAdminInterface, StatusResponseInterface } from '../interfaces';
import { WhereOptions, FindOptions } from 'sequelize';
import { STATUS_CODES, TOKEN_EXPIRATION } from '../helpers';
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

export const jwtVerifyExpireForgotPassword = (req: Request, _res: Response, next: NextFunction): void => {
    try {
        const token = req.query.token as string;
        const dataToken: any = jwt.verify(token, SECRET_KEY);
        const { userID } = dataToken;
        req.body.userID = userID;
        req.body.code = 200;
    } catch (error) {
        req.body.code = 401;
    } finally {
        next();
    }
};

export const jwtRefreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { authorization } = req.headers as AuthorizationInterface;
        const dataToken: any = jwt.verify(authorization, SECRET_KEY);
        const { userID } = dataToken;
        const getToken: string = jwtGenerated({ userID }, TOKEN_EXPIRATION.TWENTY_DAYS);
        const getRefreshToken: string = jwtGenerated({ userID, type: 'refresh' }, TOKEN_EXPIRATION.THIRTY_DAYS);
        const dataSend: StatusResponseInterface = {
            statusCode: STATUS_CODES.OK,
            token: getToken,
            refreshToken: getRefreshToken
        };
        RequestHandler.handlerResponse(res, dataSend);
    } catch (error) {
        RequestHandler.handlerResponse(res, { statusCode: STATUS_CODES.UNAUTHORIZED, error: 'Unauthorized', message: 'logout' });
    }
};

export const jwtVerifyTokenSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { authorization } = req.headers as AuthorizationInterface;
        const dataToken: any = jwt.verify(authorization, SECRET_KEY);
        const { userID } = dataToken;
        const whereUser: WhereOptions<UserInterface> = {
            id: userID
        };
        const dataUser: FindOptions<UserInterface> = {
            attributes: ['id', 'name', 'email'],
            where: whereUser
        };
        const whereSuperAdmin: WhereOptions<SuperAdminInterface> = {
            userID
        };
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