import { notFound } from '@hapi/boom';
import { WhereOptions, FindOptions, FindAndCountOptions } from 'sequelize';
import { AppointmentsInterface } from '../interfaces';
import { AppointmentsModel } from '../models';

class AppointmentsService {
    public static async update(data: Partial<AppointmentsInterface>, where: WhereOptions<AppointmentsInterface>): Promise<void> {
        const [ affectedCount ] = await AppointmentsModel.update(data, { where });
        if(affectedCount === 0) {
            throw notFound('Oops, lo sentimos pero no hemos logrado actualizar la cita.');
        }
    }

    public static async findOne(data: FindOptions<AppointmentsInterface>): Promise<AppointmentsInterface> {
        const findOne = await AppointmentsModel.findOne(data);
        if(!findOne) {
            throw notFound('Oops, lo sentimos pero no hemos logrado encontrar la cita.');
        }
        return findOne.dataValues;
    }

    public static async create(data: any): Promise<AppointmentsInterface> {
        const create = await AppointmentsModel.create(data);
        return create.dataValues;
    }

    public static async findAll(data: FindOptions<AppointmentsInterface>) {
        const getData = await AppointmentsModel.findAll(data);
        return getData;
    }

    public static async findAndCountAll(data: Omit<FindAndCountOptions<AppointmentsInterface>, 'group'>) {
        const getData = await AppointmentsModel.findAndCountAll(data);
        return getData;
    }
};

export default AppointmentsService;