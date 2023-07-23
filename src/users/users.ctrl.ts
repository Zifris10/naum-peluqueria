import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../handlers';
import { STATUS_CODES } from '../helpers';
import { StatusResponseInterface } from '../interfaces';

class UsersController {
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

export default UsersController;