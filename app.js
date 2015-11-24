require('dotenv').load();
var express  = require('express');
var config   = require('./config/config');
var glob     = require('glob');
var mongoose = require('mongoose');
var passport       = require('passport');

// MongoDB Setup
var mongoUri       =  process.env.MONGOLAB_URI || 'mongodb://localhost/general-torrents';
mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

// Require all the models in our app
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

// App Initialization
var app = express();
require('./config/express')(app, config);


// Server Start :)
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
