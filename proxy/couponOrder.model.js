/**
 * DB Proxy for couponOrder model
 */

var CouponOrder = require('../models').CouponOrder;

var totalOrdersByCouponCode = function (couponCode) {
  var queryPromise = CouponOrder.find({couponID: couponCode});
  return queryPromise.then(function (coupons) {
    return coupons.length;
  }, function (err) {
    return err;
  });
};

exports.totalOrdersByCouponCode = totalOrdersByCouponCode;


var getOrdersByCouponCode = function (couponCode, rebated) {
  if(typeof rebated !== 'undefined' )
    return CouponOrder.find({couponID : couponCode, rebated : rebated},{_id : 0, __v : 0});
  else
    return CouponOrder.find({couponID: couponCode}, {_id : 0, __v : 0});
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;

var getOrderByOrderIdAndCouponCode = function (orderId, couponCode) {
  return CouponOrder.findOne({couponID : couponCode, orderID : orderId}, {_id : 0, __v : 0});
};
exports.getOrderByOrderIdAndCouponCode = getOrderByOrderIdAndCouponCode;