import InventoryService from './inventory.service';
import { WhereOptions, FindOptions } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '../handlers';
import { trimStrings, firstLetterUpperCase, STATUS_CODES, convertPugFile } from '../helpers';
import { InventoryInterface, StatusResponseInterface } from '../interfaces';

class InventoryController {
    public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { dataToken } = req.body;
            const { inventoryID } = req.params;
            const data: Partial<InventoryInterface> = {
                deleted: true,
                deletedBy: dataToken.user.id
            };
            const where: WhereOptions<InventoryInterface> = {
                id: inventoryID,
                deleted: false
            };
            await InventoryService.update(data, where);
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
            const { name, price, dataToken } = req.body;
            const trimName: string = firstLetterUpperCase(trimStrings(name));
            const data: Partial<InventoryInterface> = {
                name: trimName,
                price,
                createdBy: dataToken.user.id
            };
            const create: InventoryInterface = await InventoryService.create(data);
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
            const data: FindOptions<InventoryInterface> = {
                attributes: ['id', 'name', 'price'],
                order: [
                    ['name', 'ASC']
                ],
                where: {
                    deleted: false
                },
                raw: true
            };
            const getData = await InventoryService.findAll(data);
            const pug: string = convertPugFile('dashboard/inventory/index', { inventory: getData });
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK,
                html: pug
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { value, fieldName } = req.body;
            const { inventoryID } = req.params;
            const data: Partial<InventoryInterface> = {
                [fieldName]: value
            };
            const where: WhereOptions<InventoryInterface> = {
                id: inventoryID,
                deleted: false
            };
            await InventoryService.update(data, where);
            const dataSend: StatusResponseInterface = {
                statusCode: STATUS_CODES.OK
            };
            RequestHandler.handlerResponse(res, dataSend);
        } catch (error) {
            next(error);
        }
    }
};

export default InventoryController;