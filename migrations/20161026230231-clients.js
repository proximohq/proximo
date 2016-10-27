'use strict';

const clients = require('../models/clients');
const roles = require('../models/roles');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('clients', clients.definition)
    .then(() => sequelize.createTable('roles', roles.definition));
  },

  down: function (sequelize) {
    return sequelize.dropTable('roles')
    .then(() => sequelize.dropTable('clients'));
  }
};
