'use strict';

const tableName = 'superAdmins';
const schema = 'naum';
const data = require('./data/202307111640-createSuperAdmin.json');

module.exports = {
    async up (queryInterface) {
        await queryInterface.bulkInsert({
            schema,
            tableName
        }, data);
    },
    async down (queryInterface) {
        await queryInterface.bulkDelete({
            schema,
            tableName
        }, data);
    }
};