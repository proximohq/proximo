'use strict';

const users = require('../models/users')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', users.definition);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
