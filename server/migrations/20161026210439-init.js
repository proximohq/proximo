'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  },

  down: function (queryInterface, Sequelize) {
    // you are on your own
    return Promise.resolve();
  }
};
