var debug = require('../config.default').debug;
var logger = require('../common/logger');


// api error send json response
exports.apiErrorHandler = function (err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    //stack: err.stack
  });
};

exports.standardErrorHandler = function (err, req, res, next) {
  logger.error(err);
  if (debug) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      //stack: err.stack
    });
  }
  else {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }
};