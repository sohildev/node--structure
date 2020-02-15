require('rootpath')();
const express = require('express');
var cors = require('cors');
var path = require('path');
require('./db');
const httpStatus = require('./lib/httpStatus')
const bodyParser = require('body-parser')
const app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require("dotenv");
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/api/v1', function (req, res) {
  res.status(httpStatus.OK).send('API v1 running');
});


// app.use('/images', (express.static(path.join(__dirname, 'public'))));

// app.use(express.static(path.join(__dirname, 'public')));

const userController = require('controllers/userController');
app.use('/api/v1/users', userController);

const authController = require('controllers/authController');
app.use('/api/v1', authController);

module.exports = app;
