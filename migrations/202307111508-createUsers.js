'use strict';
const tableName = 'users';
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