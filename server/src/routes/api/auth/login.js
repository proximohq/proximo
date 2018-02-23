const fs = require('fs');
const jwt = require('jsonwebtoken');

const db = require.main.require('../models');
const security = require.main.require('./lib/security');

module.exports = function (req, res) {
  let data, token, user;

  validateRequest()
    .then(findUserForRequestEmail)
    .then(checkIfPasswordMatches)
    .then(prepareToken)
    .then(respondSuccessfully)
    .catch((error) => {
      res.status(500).send({ message: 'Internval Server Error' });
      console.error(error);
    });

  /**
   * Validates that the request contains the email and password fields, otherwise
   * rejects the request.
   *
   * @return {Promise}
   */
  function validateRequest () {
    if (req.body.email && req.body.password) {
      return Promise.resolve();
    }

    res.status(500).send({
      error: true,
      message: 'Must provide "email" and "password" fields'
    });

    return Promise.reject();
  }

  /**
   * Finds the user for the specified email address. If the user is not found
   * the server responds with a 404.
   *
   * @return {Promise}
   */
  function findUserForRequestEmail () {
    return db.users.find({ where: { email: req.body.email } })
      .then(function (result) {
        user = result;

        if (user !== null) {
          return user;
        }

        res.status(404).send({
          error: true,
          message: `User with email ${req.body.email} not found`
        });

        return Promise.reject();
      });
  }

  /**
   * Determines if the password provided matches the one stored in the DB.
   * To do this, the password is encrypted using the salt stored in the DB.
   *
   * If the password don't match the server rejects the request.
   *
   * @return {Promise}
   */
  function checkIfPasswordMatches () {
    const [salt, hashedPassword] = user.password.toString().split(':::');
    const hash = security.hash(req.body.password, salt);

    if (hash === hashedPassword) {
      return;
    }

    res.status(500).send({
      error: true,
      message: `Wrong password`
    });

    return Promise.reject();
  }

  /**
   * Signs the user data using the private certificate.
   */
  function prepareToken () {
    let certificate = fs.readFileSync('private/private.key');

    data = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    };

    token = jwt.sign(data, certificate, {
      expiresIn: '1h'
    });
  }

  /**
   * Responds the request with the JWT signed token and the user data.
   */
  function respondSuccessfully () {
    res.send({
      success: true,
      data: data,
      token: token
    });
  }
};
