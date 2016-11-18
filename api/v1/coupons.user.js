/**
 * Created by ekinr on 2016/11/3.
 *
 * route /coupons/user/
 */

// Dependencies
var CouponProxy = require('../../proxy/coupon.proxy.js');
var CouponOrderProxy = require('../../proxy/couponOrder.proxy.js');
var Promise = require('bluebird');

var getCouponCodesByUser = function (req, res, next) {
  var username = req.params.username;
  var couponsPromise = CouponProxy.getCouponCodesByUsername(username);

  if (req.query.showTotalOrderNumber) {
    var totalOrderNumber = couponsPromise.then(function (coupons) {
      return Promise.all(coupons.map(function (coupon) {
        return CouponOrderProxy.totalOrdersByCouponCode(coupon.couponID);
      }));
    }).then(function (orderNumberArray) {
      return orderNumberArray.reduce(function (a, b) {
        return a + b;
      }, 0);
    }).catch(next);
    Promise.join(totalOrderNumber, couponsPromise, function (orderNumber, coupons) {
      return {coupons: coupons, totalCouponOrders: orderNumber};
    }).then(function (resJson) {
      res.send(resJson);
    }).catch(next);
  }
  else {
    couponsPromise.then(function (coupons) {
      res.send({coupons: coupons});
    }).catch(next);
  }
};
exports.getCouponCodesByUser = getCouponCodesByUser;

var createCouponForUser = function (req, res, next) {
  var sendCoupon = function (coupon) {
    res.statusCode = 201;
    res.send(coupon);
  };
  var username = req.params.username;
  if(username) {
    if (req.adminAuth) {
      var coupon = req.body;
      coupon.couponID = req.couponCode;
      coupon.username = username;
      CouponProxy.createCouponWithRules(coupon)
        .then(sendCoupon)
        .catch(next);
    } else {
      CouponProxy.createCouponWithDefaultRulesForSpecifiedUser(username, req.couponCode)
        .then(sendCoupon)
        .catch(next);
    }
  } else {
    var err = new Error('Username required');
    err.status = 406;
    next(err);
  }
};
exports.createCouponForUser = createCouponForUser;

