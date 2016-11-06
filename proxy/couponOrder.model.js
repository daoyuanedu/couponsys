/**
 * DB Proxy for couponOrder model
 */

var CouponOrder = require('../models').CouponOrder;

var totalOrdersByCouponId = function (couponId) {
  var queryPromise = CouponOrder.find({couponID: couponId});
  return queryPromise.then(function (coupons) {
    return coupons.length;
  }, function (err) {
    return err;
  });
};

exports.totalOrdersByCouponId = totalOrdersByCouponId;