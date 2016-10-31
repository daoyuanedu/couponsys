// Dependencies
var config = require('./config.default');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Require API routes
var index = require('./api/v1/index');
var coupons = require('./api/v1/coupon');
var orders = require('./api/v1/order');

//var logger = require('./common/logger');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URL path match api
app.use('/api/v1', index);
app.use('/api/v1/coupons', coupons);
app.use('/api/v1/orders', orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('NodeClub listening on port', config.port);
    logger.info('God bless love....');
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
    logger.info('');
  });
}

module.exports = app;