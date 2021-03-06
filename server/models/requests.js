'use strict';

const types = require('./types');

const MODEL_NAME = 'visits';

const definition = {
  id: types.id,
  visitId: types.foreignKey('visits'),
  started: types.date,
  attended: types.date,
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
