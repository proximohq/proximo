'use strict';

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/clients', function(req, res) {
  db.Client.findAll({ attributes: ['id', 'name'] })
  .then(function(clients) {
    res.json(clients);
  });
});

app.post('/api/clients', function(req, res) {

});

app.listen(3000, function () {
  console.log('App started on port 3000!');
});
