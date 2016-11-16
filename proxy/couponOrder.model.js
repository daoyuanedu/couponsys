/**
 * DB Proxy for couponOrder model
 */

var CouponOrder = require('../models').CouponOrder;

var getAllOrders = function () {
  return CouponOrder.find({}, {_id : 0, __v : 0});
};
exports.getAllOrders = getAllOrders;

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

var createNewOrder = function (couponOrder) {
  return new CouponOrder(couponOrder).save();
};
exports.createNewOrder = createNewOrder;

var updateOrderByOrderIdAndCouponCode = function (orderId, couponCode, propertiesToUpdate) {
  return CouponOrder.findOne({couponID : couponCode, orderID : orderId})
    .then(function (order) {
      if(typeof order !== 'undefined' && order !== null){
        return CouponOrder.findByIdAndUpdate(order._id,  { $set : propertiesToUpdate });
      }
      else {
        var err =  new Error('Order ' + orderId + ' does not exist.');
        err.status = 404;
        throw err;
      }
    });
};
exports.updateOrderByOrderIdAndCouponCode = updateOrderByOrderIdAndCouponCode;