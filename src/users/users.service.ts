import { notFound, badRequest } from '@hapi/boom';
import { WhereOptions, FindOptions } from 'sequelize';
import { UserInterface } from '../interfaces';
import { UsersModel } from '../models';

class UsersService {
    public static async update(data: Partial<UserInterface>, where: WhereOptions<UserInterface>): Promise<void> {
        const [ affectedCount ] = await UsersModel.update(data, { where });
        if(affectedCount === 0) {
            throw notFound('Oops, lo sentimos pero no hemos logrado actualizar el usuario.');
        }
    }
    
    public static async findOne(data: FindOptions<UserInterface>): Promise<UserInterface> {
        const findOne = await UsersModel.findOne(data);
        if(!findOne) {
            throw badRequest('Oops, lo sentimos pero no hemos logrado encontrar el usuario.');
        }
        return findOne.dataValues;
    }
};

export default UsersService;