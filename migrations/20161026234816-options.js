'use strict';

const options = require('../models/options');
const clientOptions = require('../models/client-options');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('options', options.definition)
    .then(() => sequelize.createTable('clientOptions', clientOptions.definition));
  },

  down: function (sequelize) {
    return sequelize.dropTable('clientOptions')
    .then(() => sequelize.dropTable('options'));
  }
};
