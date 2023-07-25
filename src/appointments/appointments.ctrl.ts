import AppointmentsService from './appointments.service';
import { WhereOptions, FindOptions, Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../handlers';
import { trimStrings, firstLetterUpperCase, STATUS_CODES, dayjsGetCurrentDate, dayjsSubtractDays, dayjsSetStartDate, convertPugFile, generateColor } from '../helpers';
import { AppointmentsInterface, StatusResponseInterface } from '../interfaces';
import { badRequest } from '@hapi/boom';

class AppointmentsController {
    public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { dataToken } = req.body;
            const { appointmentID } = req.params;
            const data: Partial<AppointmentsInterface> = {
                deleted: true,
                deletedBy: dataToken.user.id
            };
            const where: WhereOptions<AppointmentsInterface> = {
                id: appointmentID,
                deleted: false
            };
            await AppointmentsService.update(data, where);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { startDate, startTime, endTime, name, phone, dataToken } = req.body;
            const trimName: string = firstLetterUpperCase(trimStrings(name));
            const trimStartDate: string = trimStrings(startDate);
            const trimStartTime: string = trimStrings(startTime);
            const trimEndTime: string = trimStrings(endTime);
            const currentDate: Date = dayjsGetCurrentDate();
            const correctStartDate: Date = dayjsGetCurrentDate(`${trimStartDate}T${trimStartTime}`);
            const correctEndDate: Date = dayjsGetCurrentDate(`${trimStartDate}T${trimEndTime}`);
            if(correctStartDate <= currentDate) {
                throw badRequest('Oops, lo sentimos pero la fecha de inicio no puede ser menor a la fecha actual.');
            }
            if(correctStartDate >= correctEndDate) {
                throw badRequest('Oops, lo sentimos pero la fecha de fin no puede ser menor a la fecha inicial.');
            }
            const color: string = generateColor();
            const data: Partial<AppointmentsInterface> = {
                startDate: correctStartDate,
                endDate: correctEndDate,
                name: trimName,
                phone,
                backgroundColor: color,
                createdBy: dataToken.user.id
            };
            const create: AppointmentsInterface = await AppointmentsService.create(data);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                data: create
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const currentDate: Date = dayjsGetCurrentDate();
            const leastTwoDays: Date = dayjsSubtractDays(currentDate, 2);
            const correctDate: Date = dayjsSetStartDate(leastTwoDays);
            const where: WhereOptions<AppointmentsInterface> = {
                deleted: false,
                completed: false,
                startDate: {
                    [Op.gte]: correctDate
                }
            };
            const data: FindOptions<AppointmentsInterface> = {
                attributes: ['id', ['name', 'title'], ['startDate', 'start'], ['endDate', 'end'], 'backgroundColor', 'phone'],
                order: [
                    ['startDate', 'ASC']
                ],
                where,
                raw: true
            };
            const getData = await AppointmentsService.findAll(data);
            const pug: string = convertPugFile('dashboard/appointments/index', {});
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                data: getData,
                html: pug
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async complete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { price } = req.body;
            const { appointmentID } = req.params;
            const data: Partial<AppointmentsInterface> = {
                price,
                completed: true
            };
            const where: WhereOptions<AppointmentsInterface> = {
                id: appointmentID,
                deleted: false,
                completed: false
            };
            await AppointmentsService.update(data, where);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }
};

export default AppointmentsController;