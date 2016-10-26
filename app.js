'use strict';

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/users', function(req, res) {
  db.users.findAll()
  .then(function(clients) {
    res.json(clients);
  });
});

app.listen(3000, function () {
  console.log('App started on port 3000!');
});
