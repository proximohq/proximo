'use strict';

const attendants = require('../models/attendants');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('attendants', attendants.definition);
  },

  down: function (sequelize) {
    return sequelize.dropTable('attendants');
  }
};
