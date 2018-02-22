'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/public'));

app.use('/api', require('./routes/api'));

app.listen(3000, function () {
  console.log('App started on port 3000!');
});
