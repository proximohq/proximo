const db = require.main.require('../models');
const security = require.main.require('./lib/security');

module.exports = function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send({
      error: true,
      message: 'Must provide "email" and "password" fields'
    });
  }

  db.users.find({ where: { email: req.body.email } })
    .then(function (result) {
      if (result === null) {
        return res.status(404).send({
          error: true,
          message: `User with email ${req.body.email} not found`
        });
      }

      const [salt, hashedPassword] = result.password.toString().split(':::');

      const hash = security.hash(req.body.password, salt);

      if (hash === hashedPassword) {
        res.send({success: true});
      } else {
        res.status(500).send({
          error: true,
          message: `Wrong password`
        });
      }
    });
};
