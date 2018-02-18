'use strict';

const Sequelize = require('sequelize');

module.exports = function (modelName) {
  return {
    type: Sequelize.INTEGER(10),
    references: {
      model: modelName,
      key: 'id'
    }
  };
};
