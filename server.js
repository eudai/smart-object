/* global __dirname */
var express = require('express');
var app = express();
var path = require('path')

app.use(express.static(path.join(__dirname)));

var server = app.listen(3000, 'localhost',function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});

