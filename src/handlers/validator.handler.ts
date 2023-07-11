import { badRequest } from '@hapi/boom';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

export class ValidatorHandler {
    public static validate(schema: ObjectSchema, property: keyof Request): RequestHandler {
        return (req: Request, _res: Response, next: NextFunction) => {
            const data = req[property];
            const { error } = schema.validate(data);
            if(error) {
                throw badRequest(error);
            }
            next();
        };
    }
};