'use strict';
const tableName = 'appointments';
const schema = 'naum';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn({
            tableName,
            schema
        }, 'worker', {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: ''
        });
    }
};