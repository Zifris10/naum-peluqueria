require('dotenv').config();

const {
    AWS_RDS_USER,
    AWS_RDS_PASSWORD,
    AWS_RDS_HOST,
    AWS_RDS_NAME,
    AWS_RDS_DIALECT
} = process.env;

module.exports = {
    development: {
        username: AWS_RDS_USER,
        password: AWS_RDS_PASSWORD,
        database: AWS_RDS_NAME,
        host: AWS_RDS_HOST,
        dialect: AWS_RDS_DIALECT
    }
};