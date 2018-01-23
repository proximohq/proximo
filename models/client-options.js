'use strict';

const types = require('./types');

const MODEL_NAME = 'clientOptions';

const definition = {
  id: types.id,
  clientId: types.foreignKey('clients'),
  name: types.shortString,
  value: types.shortString
};

const model = function (sequelize) {
  return sequelize.define(MODEL_NAME, definition, {
    createdAt: false,
    updatedAt: false
  });
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
