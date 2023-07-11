import { badRequest } from '@hapi/boom';
import { FindOptions } from 'sequelize';
import { SuperAdminInterface } from '../interfaces';
import { SuperAdminsModel } from '../models';

class SuperAdminsService {    
    public static async findOne(data: FindOptions<SuperAdminInterface>): Promise<void> {
        const findOne = await SuperAdminsModel.findOne(data);
        if(!findOne) {
            throw badRequest('Oops, lo sentimos pero no hemos logrado encontrar el usuario súper admin.');
        }
    }
};

export default SuperAdminsService;