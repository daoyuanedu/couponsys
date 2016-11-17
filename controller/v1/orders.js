var couponOrderProxy = require('../../proxy/couponOrder.model');

// List Orders Page
var getAllOrders = function (req, res) {
  couponOrderProxy.getAllOrders().then(function (orders) {
    res.render('pages/orders', 
      {
        OrderList: orders
      });
  });
};
exports.getAllOrders = getAllOrders;

// CouponCode's Orders Page
var getOrdersByCouponCode = function (req, res, next) {
  //unimplemented
  var couponCode = req.params.couponCode;
  var rebated = req.query.rebated;

  couponOrderProxy.getOrdersByCouponCode(couponCode, rebated)
    .then(function (orders) {
      res.status = 200;
      res.render('modify/orderDetails', 
      {
        OrderList: orders
      });
    })
    .catch(next);
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;