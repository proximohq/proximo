'use strict';

const Sequelize = require('sequelize');
const types = require('./types');

const MODEL_NAME = 'stationServices';

const definition = {
  id: types.id,
  idGroup: types.foreignKey('serviceGroups'),
  idStation: types.foreignKey('stations'),
  name: types.shortString,
  createdAt: types.date,
  updatedAt: types.date,
  isDeleted: types.boolean
};

const model = function(sequelize) {
  return sequelize.define(MODEL_NAME, definition);
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
