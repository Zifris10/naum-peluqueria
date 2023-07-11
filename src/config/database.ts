import { Dialect, Sequelize } from 'sequelize';

const {
    AWS_RDS_DIALECT,
    AWS_RDS_HOST,
    AWS_RDS_NAME,
    AWS_RDS_PASSWORD,
    AWS_RDS_USER
} = process.env;

const databaseUser = AWS_RDS_USER as string;
const databaseName = AWS_RDS_NAME as string;
const databaseHost = AWS_RDS_HOST as string;
const databaseDialect = AWS_RDS_DIALECT as Dialect;
const databasePassword = AWS_RDS_PASSWORD as string;

export const sequelizeConnection: Sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    dialect: databaseDialect,
    host: databaseHost,
    define: {
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});