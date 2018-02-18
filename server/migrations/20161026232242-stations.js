'use strict';

const stationGroups = require('../models/station-groups');
const stations = require('../models/stations');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('stationGroups', stationGroups.definition)
    .then(() => sequelize.createTable('stations', stations.definition));
  },

  down: function (sequelize) {
    return sequelize.dropTable('stations')
    .then(() => sequelize.dropTable('stationGroups'));
  }
};
