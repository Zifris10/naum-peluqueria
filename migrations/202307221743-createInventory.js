'use strict';
const tableName = 'inventory';
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
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
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