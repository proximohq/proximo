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
  return db.createTable('visits', {
    id: types.id,
    idUser: types.foreignKey('visits', 'users'),
    started: types.dateTime,
    completed: types.dateTime
  })
  .then(() => db.createTable('requests', {
    id: types.id,
    idVisit: types.foreignKey('requests', 'visits'),
    started: types.dateTime,
    attended: types.dateTime,
    completed: types.dateTime
  }));
};

exports.down = function(db) {
  return db.dropTable('requests')
  .then(() => db.dropTable('visits'));
};

exports._meta = {
  "version": 1
};
