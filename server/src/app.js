'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const db = require('../models');

app.use(express.static('client/public'));

app.get('/api/users', function (req, res) {
  db.users.findAll()
    .then(function (users) {
      res.json(users);
    });
});

app.listen(3000, function () {
  console.log('App started on port 3000!');
});