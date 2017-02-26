const create = require('./create-controller');
const deleteOne = require('./delete-one-controller');
const findById = require('./find-by-id-controller');
const selectAll = require('./select-all-controller');
const updateOne = require('./update-one-controller');

module.exports = {
  create,
  deleteOne,
  findById,
  selectAll,
  updateOne
};
