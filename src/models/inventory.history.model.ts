import { ModelDefined, DataTypes, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { InventoryHistoryInterface } from '../interfaces';
import { SCHEMAS, TABLES } from '../helpers';

type OptionalAttributes = Optional<InventoryHistoryInterface, 'createdAt' | 'updatedAt' | 'deleted' | 'deletedBy'>;

export const InventoryHistoryModel: ModelDefined<
    InventoryHistoryInterface,
    OptionalAttributes
> = sequelizeConnection.define(TABLES.INVENTORY_HISTORY, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inventoryID: {
        type: DataTypes.UUID,
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