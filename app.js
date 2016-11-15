// Dependencies
var config = require('./config.default');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var errorHandler = require('./middlewares/errorHandler');

// Express Framewrok
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ensure log directory exists
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
app.use(logger('combined', { stream : accessLogStream}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes collection
var apiRouterV1 = require('./api.router.v1');
app.use('/api/v1/coupons',  apiRouterV1); // do we want cors?

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.originalUrl + ' Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//app.use(errorHandler.apiErrorHandler);
app.use(errorHandler.standardErrorHandler);

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('Daoyuan Edu listening on port', config.port);
    logger.info('God bless love....');
    logger.info('');
  });
}

module.exports = app;
