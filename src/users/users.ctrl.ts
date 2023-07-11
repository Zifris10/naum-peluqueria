import UsersService from './users.service';
import { WhereOptions } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../handlers';
import { trimStrings, firstLetterUpperCase, allLowerCaseLetters, STATUS_CODES } from '../helpers';
import { UserInterface, StatusResponseInterface } from '../interfaces';

export default class UsersController {
    public static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, dataToken } = req.body;
            const trimName: string = firstLetterUpperCase(trimStrings(name));
            const trimEmail: string = allLowerCaseLetters(email);
            const data: Partial<UserInterface> = {
                name: trimName,
                email: trimEmail
            };
            const where: WhereOptions<UserInterface> = {
                id: dataToken.user.id
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

    public static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { dataToken } = req.body;
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                data: dataToken.user
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }
};