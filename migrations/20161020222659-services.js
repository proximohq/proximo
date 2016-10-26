'use strict';

const types = require('./types');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('service_groups', {
    id: types.id,
    idClient: types.foreignKey('service_groups', 'clients'),
    name: types.shortString
  })
  .then(() => db.createTable('services', {
    id: types.id,
    idGroup: types.foreignKey('services', 'service_groups'),
    name: types.shortString
  }))
  .then(() => db.createTable('station_services', {
    id: types.id,
    idGroup: types.foreignKey('station_services', 'service_groups'),
    idStation: types.foreignKey('station_services', 'stations')
  }));
};

exports.down = function(db) {
  return db.dropTable('station_services')
  .then(() => db.dropTable('services'))
  .then(() => db.dropTable('service_groups'));
};

exports._meta = {
  "version": 1
};
