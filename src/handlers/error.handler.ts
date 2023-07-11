import { Response, Request, NextFunction } from 'express';
import { STATUS_CODES, MESSAGE_INTERNAL_SERVER_ERROR, logger } from '../helpers';
import { LoggerInterface } from '../interfaces';

export const errorResponse = (error: any, _req: Request, res: Response, _next: NextFunction): void => {
    if(error.isBoom) {
        const { output } = error;
        const dataLog: LoggerInterface = {
            level: 'error',
            message: output.payload.message,
            data: error
        };
        logger.log(dataLog);
        res.status(output.statusCode).send(output.payload);
    } else {
        const dataLog: LoggerInterface = {
            level: 'error',
            message: error.message,
            data: error
        };
        logger.log(dataLog);
        res.status(STATUS_CODES.BAD_REQUEST).send({ statusCode: STATUS_CODES.BAD_REQUEST, error: 'Bad Request', message: MESSAGE_INTERNAL_SERVER_ERROR.message });
    }
};