// Dependencies
var couponProxy = require('../../proxy/coupon.model');
var Promise = require('bluebird');


var getCouponsList = function(req, res, next) {
  couponProxy.getAllCoupons().then(function (coupons) {
    res.send(coupons);
  }).catch(next);
};
exports.getCouponsList = getCouponsList;

var getCouponCodesByCouponID = function(req, res, next) {
  var couponID = req.params.couponID;
  couponProxy.getCouponCodesByCouponCode(couponID).then(function (coupon) {
    res.send(coupon);
  }).catch(next);
};
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;

var createCouponForNewUser = function (req, res, next) {
  if(req.adminAuth){
    next(new Error('not implemented'));
  }
  else{
    couponProxy.createCouponWithDefaultRulesForSpecifiedUser(req.body.username, req.body.mobile)
      .then(function (coupon) {
        res.statusCode = 201;
        res.send(coupon);
    }).catch(next);
  }
};
exports.createCouponForNewUser = createCouponForNewUser;

var getDiscountOrderValueByCouponID = function (req, res, next) {
  var couponId = req.params.couponID;
  var username = req.query.username;
  var orderValue = req.query.orderValue;

  var isBelongToUsers = couponProxy.isBelongToUsers(couponId, username);
  var isCouponValid = couponProxy.isCouponValid(couponId);
  var getDiscountedValue =  couponProxy.getDiscountedValue(couponId, orderValue);

  Promise.join(isBelongToUsers, isCouponValid, getDiscountedValue, function (belong, valid, discountedValue) {
    if (!belong && valid) return true;
    return false;
  }).then(function (ableToUse) {
    if (ableToUse) {
      return getDiscountedValue.then(function (discountedValue) {
        res.statusCode = 201;
        res.send(discountedValue);
      }).catch(next);
    }
  }).catch(next);

};
exports.getDiscountOrderValueByCouponID = getDiscountOrderValueByCouponID;
