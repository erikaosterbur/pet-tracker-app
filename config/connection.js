require('dotenv').config();
const mysql2 = require('mysql2');

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      dialectModule: mysql2,
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
