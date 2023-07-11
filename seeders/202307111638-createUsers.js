'use strict';

const tableName = 'users';
const schema = 'naum';
const data = require('./data/202307111638-createUsers.json');

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