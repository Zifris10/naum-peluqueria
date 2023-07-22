import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { AppointmentsInterface } from '../interfaces';
import { SCHEMAS, TABLES } from '../helpers';

type OptionalAttributes = Optional<AppointmentsInterface, 'createdAt' | 'updatedAt' | 'deleted' | 'deletedBy'>;

export const AppointmentsModel: ModelDefined<
    AppointmentsInterface,
    OptionalAttributes
> = sequelizeConnection.define(TABLES.APPOINTMENTS, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    backgroundColor: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deletedBy: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    schema: SCHEMAS.PUBLIC
});