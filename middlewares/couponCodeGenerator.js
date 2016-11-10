/**
 * Created by ekinr on 2016/11/7.
 */


// Need to handle when generated coupon code already exists,
// Given we are using mobile number as the code,
// it's unlikely to happen for now.
exports.useMobileAsCode = function (req, res, next) {
  var code = req.body.mobile;
  if(code) {
    // Only allow valid China mobile number
    if(/1[34578]\d{9}$/.test(code)) {
      req.couponCode = code;
      next();
    }
    else {
      var err = new Error('Invalid Mobile Provided');
      err.status = 406;
      err.api = true;
      next(err);
    }
   
  }
  else {
    var err = new Error('No Mobile Provided');
    err.status = 406;
    err.api = true;
    next(err);
  }
};