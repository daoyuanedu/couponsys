// Dependencies
var couponProxy = require('../../proxy/coupon.model');
var Promise = require('bluebird');

// GET coupons/
var getCouponsList = function(req, res, next) {
  couponProxy.getAllCoupons().then(function (coupons) {
    res.send(coupons);
  }).catch(next);
};
exports.getCouponsList = getCouponsList;

// GET coupons/{couponCode}
var getCouponCodesByCouponID = function(req, res, next) {
  var couponID = req.params.couponID;
  couponProxy.getCouponCodesByCouponCode(couponID).then(function (coupon) {
    res.send(coupon);
  }).catch(next);
};
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;

// DELETE coupons/{couponCode}
var deleteCouponCodesByCouponID = function(req, res, next) {
  var couponID = req.params.couponID;
  couponProxy.deleteCouponCodesByCouponCode(couponID).then(function (coupon) {
    res.send(coupon);
  }).catch(next);
};
exports.deleteCouponCodesByCouponID = deleteCouponCodesByCouponID;

// POST coupons/
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

// GET coupons/{couponCode}/discount
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
    } else {
      next(new Error('Invalid CouponCode'));
    }
  }).catch(next);

};
exports.getDiscountOrderValueByCouponID = getDiscountOrderValueByCouponID;

// PUT coupons/{couponCode}
var updateCoupon = function (req, res, next) {
  var couponCode = req.params.couponID;
  // propertiesToUpdate
  var propertiesToUpdate = {};
  propertiesToUpdate.couponID = couponCode;
  if (typeof req.body.username  !== 'undefined') propertiesToUpdate.username = req.body.username;
  if (typeof req.body.couponRule  !== 'undefined') {
    propertiesToUpdate.couponRule = req.body.couponRule;
    if (typeof req.body.couponRule.type  !== 'undefined') propertiesToUpdate.couponRule.type = req.body.couponRule.type;  
    if (typeof req.body.couponRule.value  !== 'undefined') propertiesToUpdate.couponRule.value = req.body.couponRule.value;
  }
  if (typeof req.body.rebateRule !== 'undefined') {
    propertiesToUpdate.rebateRule = req.body.rebateRule;
    if (typeof req.body.rebateRule.type !== 'undefined') propertiesToUpdate.rebateRule.type = req.body.rebateRule.type;
    if (typeof req.body.rebateRule.value  !== 'undefined') propertiesToUpdate.rebateRule.value = req.body.rebateRule.value;
  }
  if (typeof req.body.valid  !== 'undefined') propertiesToUpdate.valid = req.body.valid;

  couponProxy.updateOrderByCouponID(couponCode, propertiesToUpdate)
    .then(function (coupon) {
      res.status(204);
      res.send(coupon);
  }).catch(next);
 };
 exports.updateCoupon = updateCoupon;
