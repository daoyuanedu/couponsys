var couponOrderProxy = require('../../proxy/couponOrder.proxy');

// List Orders Page
var getAllOrders = function (req, res) {
  couponOrderProxy.getOrders().then(function (orders) {
    res.render('pages/order/orders');
  });
};
exports.getOrders = getAllOrders;

// CouponCode's Orders Page
var getOrdersByOrderID = function (req, res, next) {
  //unimplemented
  var orderID = req.params.orderID;

  couponOrderProxy.getOrderByOrderId(orderID)
  .then(function (order) {
    if (order) {
      res.status(200);
      res.render('pages/order/orderDetails',
      {
        OrderList: order
      });
    } else {
      res.status(404);
      res.render('partials/noFoundError',
      {
        errorData: order
      });
    }
  }).catch(next);
};
exports.getOrdersByOrderID = getOrdersByOrderID;
