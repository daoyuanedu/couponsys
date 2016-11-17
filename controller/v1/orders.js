var couponOrderProxy = require('../../proxy/couponOrder.proxy.js');
var couponOrder = require('../../models').CouponOrder;

// For UI test, need to delete later
var couponOrderData = require('../../test/common/modelCouponOrderTestData');
var saveToUITest = function () {
  new couponOrder(couponOrderData.orderUsingUserACouponCash1Rebated).save();
  new couponOrder(couponOrderData.orderUsingUserACouponCash1NotRebated).save();
  new couponOrder(couponOrderData.couponOrderNormal).save();
  new couponOrder(couponOrderData.couponOrderWithSameCouponID).save();
};

// Orders
var orders = function (req, res) {
  saveToUITest();
  couponOrderProxy.getAllOrders().then(function (orders) {
    res.render('pages/orders',
      {
        OrderList: orders
      });
  });
};
exports.orders = orders;