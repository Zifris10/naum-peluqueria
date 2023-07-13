import { Request, Response } from 'express';
import { convertPugFile, STATUS_CODES } from '../helpers';

class ViewsController {
    public static async updatePassword(req: Request, res: Response): Promise<void> {
        const html: string = convertPugFile('forgotPassword', req.body);
        res.status(STATUS_CODES.OK).send(html);
    }

    public static async login(req: Request, res: Response): Promise<void> {
        const html: string = convertPugFile('login', req.body);
        res.status(STATUS_CODES.OK).send(html);
    }
};

export default ViewsController;