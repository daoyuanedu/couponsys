/**
 * Created by ekinr on 2016/11/3.
 *
 * route /coupons/user/
 */

var coupon = require('../../proxy/coupon.model');
var logger = require('../../common/logger');

var getCouponCodesByUser = function(req, res, next) {
  var username = req.params.username;
  coupon.getCouponCodesByUsername(username).then(function (coupons) {
    res.send(coupons);
  }, function (err) {
    logger.error(err);
    err.api = true;   
    err.status = 406;
    next(err);
  });
};
exports.getCouponCodesByUser = getCouponCodesByUser;

var createCouponForUser = function (req, res, next) {
  if(req.adminAuth){
    next({message: 'unimplemented...'});
  }else{
    coupon.createCouponWithDefaultRulesForSpecifiedUser(req.userName, req.couponCode).then(function (coupon) {
      res.statusCode = 201;
      res.send(coupon);
    }, function (err) {
      err.api = true;
      next(err);
    });
  }
};
exports.createCouponForUser = createCouponForUser;

