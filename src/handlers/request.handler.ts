import { Response } from 'express';
import { StatusResponseInterface } from '../interfaces';

export class RequestHandler {
    public static handlerResponse(res: Response, data: StatusResponseInterface): void {
        res.status(data.statusCode).send(data);
    }
};