/* global __dirname */
var express = require('express')
var request = require('request')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname)))

app.get('/_all_dbs',function(req,res){
  request(function(error,response,body){
    res.json( error || body )
  })
})

var server = app.listen(3001, 'localhost',function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port);
});

