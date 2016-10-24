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
  return db.createTable('attendant_stations', {
    id: types.id,
    idStation: types.foreignKey('attendant_stations', 'stations'),
    idAttendant: types.foreignKey('attendant_stations', 'roles'),
    started: types.dateTime,
    completed: types.dateTime
  });
};

exports.down = function(db) {
  return db.dropTable('attendant_stations');
};

exports._meta = {
  "version": 1
};
