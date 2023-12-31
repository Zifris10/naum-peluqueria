'use strict';
const tableName = 'appointments';
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