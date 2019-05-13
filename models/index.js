import Sequelize from 'sequelize';
require('dotenv').config()

const env = process.env.NODE_ENV;
const envString = env.toUpperCase();

const DATABASE_NAME = process.env.RDS_DB_NAME || process.env['DATABASE_' + envString];
const DATABASE_USER = process.env.RDS_USERNAME || process.env['DATABASE_USER'];
const DATABASE_PASSWORD = process.env.RDS_PASSWORD || process.env['DATABASE_PASSWORD'];
const DATABASE_HOST = process.env.RDS_HOSTNAME || 'localhost';

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: process.env.RDS_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  }
);

const models = {
  Url: sequelize.import('./url')
};

export { sequelize };

export default models;
