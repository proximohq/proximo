'use strict';

const Sequelize = require('sequelize');
const types = require('./types');

const MODEL_NAME = 'roles';

const definition = {
  id: types.id,
  idClient: types.foreignKey('clients'),
  idUser: types.foreignKey('users'),
  role: Sequelize.ENUM('ADMIN', 'ATTENDANT')
};

const model = function(sequelize) {
  return sequelize.define(MODEL_NAME, definition);
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
