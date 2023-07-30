'use strict';
const tableName = 'inventoryHistory';
const schema = 'naum';

module.exports = {
    async up (queryInterface, DataTypes) {
        await queryInterface.createTable(tableName, {
            id: {
                type: DataTypes.UUID,
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
                allowNull: false,
                references: {
                    model: {
                        tableName: 'inventory',
                        schema
                    },
                    key: 'id'
                }
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users',
                        schema
                    },
                    key: 'id'
                }
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            deletedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'users',
                        schema
                    },
                    key: 'id'
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('NOW')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.fn('NOW')
            }
        }, {
            schema
        });
    },
    async down (queryInterface) {
        await queryInterface.dropTable({
            schema,
            tableName
        });
    }
};