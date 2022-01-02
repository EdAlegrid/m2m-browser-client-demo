'use strict';

var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(express.static('public'));

app.listen(4500);
console.log('http listening on port 4500');
