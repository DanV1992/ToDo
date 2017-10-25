var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
var bodyParser = require('body-parser');
var logger = require('./logger');

module.exports = function (app, config) {

  logger.log('Loading Mongoose functionality');
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db, {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at' + config.db);
  });

  if (process.env.NODE_ENV !== 'test'){app.use(morgan('dev'));
  
  mongoose.set('debug', true);
  mongoose.connection.once('open', function callback() {
    logger.log("Mongoose connected to the database");
  });


  app.use(function (req, res, next) {
    logger.log('Request from ' + req.connection.remoteAddress, 'info');
    next();
  });
  }
//error handlers

app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));

logger.log("Loading models");
var models = glob.sync(config.root + '/app/controllers/*.js');
models.forEach(function (model) {
  require(model);
});

var controllers = glob.sync(config.root + '/app/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller)(app, config);
});

app.use(express.static(config.root + '/public'));

  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Server Error');
  });

  logger.log("Starting application");

};