/**
 * Created by ekinr on 2016/11/3.
 *
 * route /coupons/user/
 */

var coupon = require('../../proxy/coupon.model');
var couponOrder = require('../../proxy/couponOrder.model');
var logger = require('../../common/logger');

var Promise = require('bluebird');

var getCouponCodesByUser = function(req, res, next) {
  var username = req.params.username;
  coupon.getCouponCodesByUsername(username).then(function (coupons) {
    var couponsForUser = coupons;
    var queryPromises = [];
    if(req.query.showTotalOrderNumber){
      couponsForUser.forEach(function (coupon) {
        queryPromises.push(couponOrder.totalOrdersByCouponId(coupon.couponID));
      });
      Promise.all(queryPromises).then(function (orderNumberArray) {
        var totalOrderNumber = orderNumberArray.reduce(function(a, b) {
          return a + b;
        }, 0);
        res.send({coupons : couponsForUser, totalCouponOrders: totalOrderNumber});
      }, function (err) {
        logger.error(err);
        err.api = true;
        next(err);
      });
    }
    else{
      res.send({coupons: couponsForUser});
    }
  }, function (err) {
    logger.error(err);
    err.api = true;   
    err.status = 406;
    next(err);
  });
};
exports.getCouponCodesByUser = getCouponCodesByUser;

var createCouponForUser = function (req, res, next) {
  var username = req.params.username;
  if(req.adminAuth){
    next({message: 'unimplemented...'});
  }else{
    coupon.createNewCouponWithDefaultRules(username, req.couponCode).then(function (coupon) {
      res.statusCode = 201;
      res.send(coupon);
    }, function (err) {
      err.api = true;
      next(err);
    });
  }
};
exports.createCouponForUser = createCouponForUser;

