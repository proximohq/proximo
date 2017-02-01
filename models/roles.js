'use strict';

const Sequelize = require('sequelize');
const types = require('./types');

const MODEL_NAME = 'roles';

const definition = {
  id: types.id,
  clientId: types.foreignKey('clients'),
  userId: types.foreignKey('users'),
  role: Sequelize.ENUM('ADMIN', 'ATTENDANT'),
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
