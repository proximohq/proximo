'use strict';

const schema = require('../schema');
const Sequelize = require('sequelize');


const Client = schema.define('Client', {
  name: Sequelize.STRING
}, {
  tableName: 'clients'
});

module.exports = Client;
