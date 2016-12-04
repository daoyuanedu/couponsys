/**
 * DB Proxy for couponOrder model
 */

var CouponOrder = require('../models').CouponOrder;

var totalOrdersByCouponCode = function (couponCode) {
  return CouponOrder.find({couponID: couponCode})
    .then(function (orders) {
      return orders.length;
    });
};
exports.totalOrdersByCouponCode = totalOrdersByCouponCode;


var buildOrderQueries = function (couponCode, salesCode, rebated, since, until) {
  var queries = {};

  if(typeof couponCode !== 'undefined' && couponCode !== null)
    queries.couponID = couponCode;

  if(typeof salesCode !== 'undefined' && salesCode !== null){
    queries['salesRef.salesCode'] = salesCode;
  }

  if(typeof rebated !== 'undefined' && rebated !== null){
    if(typeof queries['salesRef.salesCode']  !== 'undefined')
      queries['salesRef.rebated'] = rebated;
    else queries.rebated = rebated;
  }
  if(since instanceof Date) {
    if(typeof queries.createdAt === 'undefined')
      queries.createdAt = {};
    queries.createdAt.$gte = since;
  }

  if(until instanceof Date){
    if(typeof queries.createdAt === 'undefined')
      queries.createdAt = {};
    queries.createdAt.$lt = until;
  }
  return queries;
};


var getOrdersByCouponCode = function (couponCode, rebated, since, until) {
  return CouponOrder.find(buildOrderQueries(couponCode, null, rebated, since, until), {_id : 0, __v : 0});
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;

var getOrdersBySalesCode = function (salesCode, rebated, since, until) {
  return CouponOrder.find(buildOrderQueries(null, salesCode, rebated, since, until), {_id : 0, __v : 0});
};
exports.getOrdersBySalesCode = getOrdersBySalesCode;


var getOrderByOrderId = function (orderId, couponCode) {
  var queries = {orderID : orderId};
  if(couponCode) queries.couponID = couponCode;
  return CouponOrder.findOne(queries, {_id : 0, __v : 0});
};
exports.getOrderByOrderId = getOrderByOrderId;

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

var updateOrderSalesRefByOrderId = function (orderId, salesCode, propertiesToUpdate) {
  return CouponOrder.findOne({ 'salesRef.salesCode' : salesCode, orderID : orderId})
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
exports.updateOrderSalesRefByOrderId = updateOrderSalesRefByOrderId;


var getOrders = function (rebated, since, until) {
  return CouponOrder.find(buildOrderQueries(null, null, rebated, since, until), {_id : 0, __v : 0});
};
exports.getOrders = getOrders;