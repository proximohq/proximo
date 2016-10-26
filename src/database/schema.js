'use strict';

const Sequelize = require('sequelize');
const password = process.env.MYSQL_ROOT_PASSWORD;

module.exports = new Sequelize('proximo', 'root', password, {
  host: 'database'
});
