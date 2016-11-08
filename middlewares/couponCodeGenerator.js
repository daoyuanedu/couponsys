/**
 * Created by ekinr on 2016/11/7.
 */
exports.useMobileAsCode = function (req, res, next) {
  var code = req.body.mobile;
  if(code) {
    req.couponCode = code;
    next();
  }
  else {
    var err = new Error('No Mobile Provided');
    err.status = 406;
    err.api = true;
    next(err);
  }
};