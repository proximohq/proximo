'use strict';

const dotenv = require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD,
    "database": "proximo",
    "host": "database",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD,
    "database": "proximo",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD,
    "database": "proximo",
    "host": "database",
    "dialect": "mysql"
  }
}
