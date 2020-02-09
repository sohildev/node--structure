'use strict';

var env = process.env.NODE_ENV || 'development';
// var config = require(`./${env}`)
var config = require(`./development`)

module.exports = config;
