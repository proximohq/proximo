'use strict';

const visits = require('../models/visits');
const requests = require('../models/requests');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('visits', visits.definition)
    .then(() => sequelize.createTable('requests', requests.definition));
  },

  down: function (sequelize) {
    return sequelize.dropTable('requests')
    .then(() => sequelize.dropTable('visits'));
  }
};
