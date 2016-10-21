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
  return db.createTable('clients', {
    id: types.id,
    name: types.shortString
  })
  .then(() => db.createTable('client_roles', {
    id: types.id,
    idClient: types.foreignKey('client_roles', 'clients'),
    idUser: types.foreignKey('client_roles', 'users'),
    role: types.enum('ADMIN', 'ATTENDANT')
  }));
};

exports.down = function(db) {
  return db.dropTable('clients')
  .then(() => db.dropTable('client_roles'));
};

exports._meta = {
  "version": 1
};
