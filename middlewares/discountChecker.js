exports.couponOwnerChecker = function (req, res, next) {
  var username = req.query.username;
  var orderValue = req.query.orderValue;

  if(!username) {
  	var err = new Error('No Username Provided');
    err.status = 406;
    next(err);
  }

  if(!orderValue) {
  	var err = new Error('No orderValue Provided');
    err.status = 406;
    next(err);
  }
  next();
};

