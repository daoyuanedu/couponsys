/**
 * Created by ekinr on 2016/11/10.
 */
var couponOrder = require('../../proxy/couponOrder.model');


var getOrdersByCouponCode = function (req, res, next) {

  //unimplemented
  var adminAuth = req.adminAuth;

  var couponCode = req.params.couponCode;
  var rebated = req.query.rebated; // if undefined, show all.

  couponOrder.getOrdersByCouponCode(couponCode, rebated)
    .then(function (orders) {
      res.status = 200;
      res.send({orders : orders});
    })
    .catch(next);
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;

var getOrderByOrderIdAndCouponCode = function (req, res, next) {
  var couponCode = req.params.couponCode;
  var orderId = req.params.orderId;

  couponOrder.getOrderByOrderIdAndCouponCode(orderId, couponCode)
    .then(function (order) {
      if(typeof order !== 'undefined' && order !== null)
        res.send(order);
      else {
        var err =  new Error('Could not find order ' + orderId + ' under coupon ' + couponCode);
        err.status = 404;
        throw err;
      }
    }).catch(next);
};
exports.getOrderByOrderIdAndCouponCode = getOrderByOrderIdAndCouponCode;