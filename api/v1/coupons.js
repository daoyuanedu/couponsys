// Dependencies
var CouponProxy = require('../../proxy/coupon.proxy.js');
var Promise = require('bluebird');

// GET coupons/
var getCouponsList = function (req, res, next) {
  CouponProxy.getAllCoupons().then(function (coupons) {
    res.status(200);
    res.send(coupons);
  }).catch(next);
};
exports.getCouponsList = getCouponsList;

// GET coupons/{couponCode}
var getCouponCodesByCouponID = function (req, res, next) {
  var couponID = req.params.couponID;
  CouponProxy.getCouponCodeByCode(couponID).then(function (coupon) {
    if(coupon) {
      res.status(200);
      res.send(coupon);
    } else {
      var err = new Error('No Coupon code ' + couponID + ' found');
      err.status = 404;
      throw(err);
    }
  }).catch(next);
};
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;

// DELETE coupons/{couponCode}
var deleteCouponCodesByCouponID = function (req, res, next) {
  var couponID = req.params.couponID;
  CouponProxy.deleteCouponCodesByCouponCode(couponID).then(function () {
    res.status(204);
    res.send();
  }).catch(next);
};
exports.deleteCouponCodesByCouponID = deleteCouponCodesByCouponID;

// POST coupons/
var createCouponForUser = function (req, res, next) {
  var sendCoupon = function (coupon) {
    res.statusCode = 201;
    res.send(coupon);
  };
  var coupon = req.body;
  if(coupon.username) {
    if (req.adminAuth) {
      coupon.couponID = req.couponCode;
      CouponProxy.createCouponWithRules(coupon)
        .then(sendCoupon).catch(next);
    }
    else {
      CouponProxy.createCouponWithDefaultRulesForSpecifiedUser(coupon.username, req.couponCode)
        .then(sendCoupon).catch(next);
    }
  } else{
    var err = new Error('username required');
    err.status = 406;
    next(err);
  }

};
exports.createCouponForUser = createCouponForUser;

// GET coupons/{couponCode}/discount
var getDiscountOrderValueByCouponID = function (req, res, next) {
  var couponId = req.params.couponID;
  var username = req.query.username;
  var orderValue = req.query.orderValue;

  var isBelongToUsers = CouponProxy.isBelongToUsers(couponId, username);
  var isCouponValid = CouponProxy.isCouponValid(couponId);
  var getDiscountedValue = CouponProxy.getDiscountedValue(couponId, orderValue);

  Promise.join(isBelongToUsers, isCouponValid, function (belong, valid) {
    return (!belong && valid);
  }).then(function (ableToUse) {
    if (ableToUse) {
      return getDiscountedValue;
    } else {
      throw new Error('Invalid CouponCode');
    }
  }).then(function (discountedValue) {
    res.statusCode = 200;
    res.send(discountedValue);
  }).catch(next);

};
exports.getDiscountOrderValueByCouponID = getDiscountOrderValueByCouponID;

// PUT coupons/{couponCode}
var updateCoupon = function (req, res, next) {
  if(req.adminAuth) {
    var couponCode = req.params.couponID;
    // propertiesToUpdate
    var propertiesToUpdate = {};
    propertiesToUpdate.couponID = couponCode;
    if (typeof req.body.username !== 'undefined') propertiesToUpdate.username = req.body.username;
    if (typeof req.body.couponRule !== 'undefined') {
      propertiesToUpdate.couponRule = req.body.couponRule;
      if (typeof req.body.couponRule.type !== 'undefined') propertiesToUpdate.couponRule.type = req.body.couponRule.type;
      if (typeof req.body.couponRule.value !== 'undefined') propertiesToUpdate.couponRule.value = req.body.couponRule.value;
    }
    if (typeof req.body.rebateRule !== 'undefined') {
      propertiesToUpdate.rebateRule = req.body.rebateRule;
      if (typeof req.body.rebateRule.type !== 'undefined') propertiesToUpdate.rebateRule.type = req.body.rebateRule.type;
      if (typeof req.body.rebateRule.value !== 'undefined') propertiesToUpdate.rebateRule.value = req.body.rebateRule.value;
    }
    if (typeof req.body.valid !== 'undefined') propertiesToUpdate.valid = req.body.valid;

    CouponProxy.updateOrderByCouponID(couponCode, propertiesToUpdate)
      .then(function (coupon) {
        res.status(204);
        res.send(coupon);
      }).catch(next);
  }
  else {
    var err = new Error('Only Admin can edit a coupon');
    err.status = 403;
    next(err);
  }
};
exports.updateCoupon = updateCoupon;
