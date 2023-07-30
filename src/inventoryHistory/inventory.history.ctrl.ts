import InventoryHistoryService from './inventory.history.service';
import InventoryService from '../inventory/inventory.service';
import { WhereOptions, FindOptions, Op, Sequelize } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../handlers';
import { STATUS_CODES, dayjsSetStartDate, dayjsSetEndDate, convertPugFile } from '../helpers';
import { InventoryHistoryInterface, InventoryInterface, StatusResponseInterface } from '../interfaces';
import { badRequest } from '@hapi/boom';

interface QueryParamsInventoryHistory {
    startDate?: string;
    endDate?: string;
}

class InventoryHistoryController {
    public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { inventoryID, price, dataToken } = req.body;
            const data: Partial<InventoryHistoryInterface> = {
                price,
                inventoryID,
                createdBy: dataToken.user.id
            };
            await InventoryHistoryService.create(data);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { startDate, endDate } = req.query as QueryParamsInventoryHistory;
            const correctStartDate: Date = dayjsSetStartDate(startDate!);
            const correctEndDate: Date = dayjsSetEndDate(endDate!);
            if(correctStartDate >= correctEndDate) {
                throw badRequest('Oops, lo sentimos pero la fecha de fin no puede ser menor a la fecha inicial.');
            }
            const where: WhereOptions<InventoryHistoryInterface> = {
                deleted: false,
                createdAt: {
                    [Op.between]: [correctStartDate, correctEndDate]
                }
            };
            const dataHistory: FindOptions<InventoryHistoryInterface> = {
                attributes: ['price', 'inventoryID', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
                where,
                group: ['price', 'inventoryID'],
                order: [[Sequelize.literal('count'), 'DESC']],
                raw: true
            };
            const dataInventary: FindOptions<InventoryInterface> = {
                attributes: ['id', 'name'],
                raw: true
            };
            const [ getInventory, getInventoryHistory ] = await Promise.all([
                InventoryService.findAll(dataInventary),
                InventoryHistoryService.findAll(dataHistory)
            ]);
            const pug: string = convertPugFile('dashboard/inventory/history', { inventory: getInventory, history: getInventoryHistory });
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                html: pug
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }
};

export default InventoryHistoryController;