'use strict';

const types = require('./types');

const MODEL_NAME = 'services';

const definition = {
  id: types.id,
  groupId: types.foreignKey('serviceGroups'),
  name: types.shortString
};

const model = function (sequelize) {
  return sequelize.define(MODEL_NAME, definition);
};

module.exports = {
  name: MODEL_NAME,
  model,
  definition
};
