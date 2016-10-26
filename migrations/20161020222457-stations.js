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
  return db.createTable('station_groups', {
    id: types.id,
    idClient: types.foreignKey('station_groups', 'clients'),
    name: types.shortString
  })
  .then(() => db.createTable('stations', {
    id: types.id,
    idGroup: types.foreignKey('stations', 'station_groups'),
    name: types.shortString
  }));
};

exports.down = function(db) {
  return db.dropTable('stations')
  .then(() => db.dropTable('station_groups'));
};

exports._meta = {
  "version": 1
};
