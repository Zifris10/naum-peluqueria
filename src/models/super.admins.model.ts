import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { SuperAdminInterface } from '../interfaces';
import { SCHEMAS, TABLES } from '../helpers';

type OptionalAttributes = Optional<SuperAdminInterface, 'createdAt' | 'updatedAt'>;

export const SuperAdminsModel: ModelDefined<
    SuperAdminInterface,
    OptionalAttributes
> = sequelizeConnection.define(TABLES.SUPER_ADMINS, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    schema: SCHEMAS.PUBLIC
});