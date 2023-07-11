'use strict';
const tableName = 'superAdmins';
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
            userID: {
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