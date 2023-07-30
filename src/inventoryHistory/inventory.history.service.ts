import { FindOptions } from 'sequelize';
import { InventoryHistoryInterface } from '../interfaces';
import { InventoryHistoryModel } from '../models';

class InventoryHistoryService {
    public static async create(data: any): Promise<void> {
        await InventoryHistoryModel.create(data);
    }

    public static async findAll(data: FindOptions<InventoryHistoryInterface>) {
        const getData = await InventoryHistoryModel.findAll(data);
        return getData;
    }
};

export default InventoryHistoryService;