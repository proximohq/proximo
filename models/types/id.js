'use strict';

const Sequelize = require('sequelize');

module.exports = {
  type: Sequelize.INTEGER(10),
  primaryKey: true,
  autoIncrement: true
};
