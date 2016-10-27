'use strict';

const servicesGroup = require('../models/service-groups');
const services = require('../models/services');
const stationServices = require('../models/station-services');

module.exports = {
  up: function (sequelize) {
    return sequelize.createTable('serviceGroups', servicesGroup.definition)
    .then(() => sequelize.createTable('services', services.definition))
    .then(() => sequelize.createTable('stationServices', stationServices.definition));
  },

  down: function (sequelize) {
    return sequelize.dropTable('stationServices')
    .then(() => sequelize.dropTable('services'))
    .then(() => sequelize.dropTable('servicesGroup'));
  }
};
