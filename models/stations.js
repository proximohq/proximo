'use strict';

const Sequelize = require('sequelize');
const types = require('./types');

const MODEL_NAME = 'stations';

const definition = {
  id: types.id,
  idGroup: types.foreignKey('stationGroups'),
  name: types.shortString
};

const model = function(sequelize) {
  return sequelize.define(MODEL_NAME, definition);
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
