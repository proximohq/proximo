'use strict';

const users = require('../models/users');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('users', users.definition);
  },

  down: function (sequelize) {
    return sequelize.dropTable('users');
  }
};
