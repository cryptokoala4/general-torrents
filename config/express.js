var express        = require('express');
var glob           = require('glob');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var compress       = require('compression');
var methodOverride = require('method-override');
var passport       = require('passport');
var session        = require('express-session');
var flash          = require('connect-flash');
var expressLayouts = require('express-ejs-layouts');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // MIDDLEWARE SETUP
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/layout');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(expressLayouts);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(session({
    secret: process.env.PASSPORT_SECRET || 'WDI-GENERAL-ASSEMBLY-EXPRESS',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // PASSPORT SETUP
  require(config.root + "/config/passport.js")(passport);

  // CONTROLLER SETUP
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  // API CONTROLLER SETUP
  var apiControllers = glob.sync(config.root + '/app/controllers/api/*.js');
  apiControllers.forEach(function (apiController) {
    require(apiController)(app);
  });

  // DEVELOPMENT UTIL MIDDLEWARES (Show Errors)
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('layouts/error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('layouts/error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });

};
