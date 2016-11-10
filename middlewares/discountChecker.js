var Coupon = require('../models').Coupon;

var showError = function (status, err, next){
  err.api = true;
  err.status = status;
  next(err);
}

exports.couponOwnerChecker = function (req, res, next) {
  var username = req.query.username;
  var orderValue = req.query.orderValue;

  if(!username) {
  	var err = new Error('No Username Provided');
    showError(406, err, next);
  }

  if(!orderValue) {
  	var err = new Error('No orderValue Provided');
    showError(406, err, next);
  }
  next();
};

