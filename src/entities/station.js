var db = require('../database');

module.exports = {
  create: function create(station) {
    db.station.insert(station);
  }
};
