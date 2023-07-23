import { notFound } from '@hapi/boom';
import { WhereOptions, FindOptions, FindAndCountOptions } from 'sequelize';
import { InventoryInterface } from '../interfaces';
import { InventoryModel } from '../models';

class InventoryService {
    public static async update(data: Partial<InventoryInterface>, where: WhereOptions<InventoryInterface>): Promise<void> {
        const [ affectedCount ] = await InventoryModel.update(data, { where });
        if(affectedCount === 0) {
            throw notFound('Oops, lo sentimos pero no hemos logrado actualizar el artículo del inventario.');
        }
    }

    public static async create(data: any): Promise<InventoryInterface> {
        const create = await InventoryModel.create(data);
        return create.dataValues;
    }

    public static async findAll(data: FindOptions<InventoryInterface>) {
        const getData = await InventoryModel.findAll(data);
        return getData;
    }

    public static async findAndCountAll(data: Omit<FindAndCountOptions<InventoryInterface>, 'group'>) {
        const getData = await InventoryModel.findAndCountAll(data);
        return getData;
    }
};

export default InventoryService;