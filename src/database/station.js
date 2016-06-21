var nedb = require('nedb');
var config = require('../config.js');
var Station = new nedb({
  fileName: `${config.DB_PATH}station.db`,
  autoload: true
});

module.exports = Station;
