var debug = require('../config.default').debug;

// api error send json response
exports.apiErrorHandler = function (err, req, res, next) {
  if (err.api) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      stack: err.stack
    });
  }
  else next(err);
};

exports.standardErrorHandler = function (err, req, res, next) {
  if (debug) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      stack: err.stack
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