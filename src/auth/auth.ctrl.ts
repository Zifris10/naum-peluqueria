import { Request, Response, NextFunction } from 'express';
import UsersService from '../users/users.service';
import SuperAdminsService from '../superAdmins/super.admins.service';
import { jwtGenerated, comparePassword, convertPassword, STATUS_CODES, emailForgotPassword, allLowerCaseLetters, TOKEN_EXPIRATION } from '../helpers';
import { UserInterface, SuperAdminInterface, StatusResponseInterface } from '../interfaces';
import { RequestHandler } from '../handlers';
import { WhereOptions, FindOptions } from 'sequelize';

class AuthController {
    public static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const trimEmail: string = allLowerCaseLetters(email);
            const whereUser: WhereOptions<UserInterface> = {
                email: trimEmail
            };
            const dataUser: FindOptions<UserInterface> = {
                attributes: ['id', 'name', 'email'],
                where: whereUser
            };
            const getUser: UserInterface = await UsersService.findOne(dataUser);
            const getToken: string = jwtGenerated({ userID: getUser.id }, TOKEN_EXPIRATION.FIFTEEN_MINUTES);
            await emailForgotPassword(getUser, getToken);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const trimEmail: string = allLowerCaseLetters(email);
            const whereUser: WhereOptions<UserInterface> = {
                email: trimEmail
            };
            const dataUser: FindOptions<UserInterface> = {
                attributes: ['id', 'name', 'email', 'password'],
                where: whereUser
            };
            const getUser: UserInterface = await UsersService.findOne(dataUser);
            await comparePassword(password, getUser.password);
            const whereSuperAdmin: WhereOptions<SuperAdminInterface> = {
                userID: getUser.id
            };
            const dataSuperAdmin: FindOptions<SuperAdminInterface> = {
                attributes: ['id'],
                where: whereSuperAdmin
            };
            await SuperAdminsService.findOne(dataSuperAdmin);
            const getToken: string = jwtGenerated({ userID: getUser.id }, TOKEN_EXPIRATION.TWENTY_DAYS);
            const getRefreshToken: string = jwtGenerated({ userID: getUser.id, type: 'refresh' }, TOKEN_EXPIRATION.THIRTY_DAYS);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                token: getToken,
                refreshToken: getRefreshToken
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { password, userID } = req.body;
            const setPassword: string = await convertPassword(password);
            const data: Partial<UserInterface> = {
                password: setPassword
            };
            const where: WhereOptions<UserInterface> = {
                id: userID
            };
            await UsersService.update(data, where);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }
};

export default AuthController;