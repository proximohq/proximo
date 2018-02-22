const db = require.main.require('../models');

module.exports = function (req, res) {
  db.users.findAll()
    .then(function (users) {
      res.json(users);
    });
};
