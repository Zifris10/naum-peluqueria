import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { UserInterface } from '../interfaces';
import { SCHEMAS, TABLES } from '../helpers';

type OptionalAttributes = Optional<UserInterface, 'createdAt' | 'updatedAt'>;

export const UsersModel: ModelDefined<
    UserInterface,
    OptionalAttributes
> = sequelizeConnection.define(TABLES.USERS, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    schema: SCHEMAS.PUBLIC
});