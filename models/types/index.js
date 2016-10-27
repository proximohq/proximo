'use strict';

const id = require('./id');
const shortString = require('./short-string');
const date = require('./date');
const boolean = require('./boolean');
const email = require('./email');
const foreignKey = require('./foreign-key');

module.exports = {
  id,
  shortString,
  date,
  boolean,
  email,
  foreignKey
};
