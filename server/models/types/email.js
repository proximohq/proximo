'use strict';

const Sequelize = require('sequelize');

module.exports = {
  type: Sequelize.STRING,
  unique: true,
  validate: {
    isEmail: true
  }
};
