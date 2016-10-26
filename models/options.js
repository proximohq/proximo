'use strict';

const Sequelize = require('sequelize');
const types = require('./types');

const MODEL_NAME = 'options';

const definition = {
  id: types.id,
  name: types.shortString,
  value: types.shortString
};

const model = function(sequelize) {
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
