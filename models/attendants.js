'use strict';

const types = require('./types');

const MODEL_NAME = 'attendants';

const definition = {
  id: types.id,
  stationId: types.foreignKey('stations'),
  attendantId: types.foreignKey('roles'),
  started: types.date,
  completed: types.date,
  createdAt: types.date,
  updatedAt: types.date,
  isDeleted: types.boolean
};

const model = function (sequelize) {
  return sequelize.define(MODEL_NAME, definition);
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
