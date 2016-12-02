// Info
var info = function (req, res) {
  res.render('pages/info');
};
exports.info = info;

// Info
var login = function (req, res) {
  res.render('pages/login');
};
exports.login = login;

// Index
var index = function (req, res) {
  saveToUITest();
  res.render('pages/index');
};
exports.index = index;

var coupon = require('../../models').Coupon;
var couponOrder = require('../../models').CouponOrder;
var user = require('../../models').User;

// For UI test, need to delete later
var couponData = require('../../test/common/modelCouponTestData');
var couponOrderData = require('../../test/common/modelCouponOrderTestData');
var userData = require('../../test/common/mockUsers');

var saveToUITest = function () {
  coupon.remove({});
  couponOrder.remove({});
  user.remove({});

  new coupon(couponData.userBCouponWithSalesACode).save();
  new coupon(couponData.userACouponWithSalesACode).save();
  new coupon(couponData.salesBCoupon).save();
  new coupon(couponData.salesACoupon).save();
  new coupon(couponData.invalidCoupon).save();

  new couponOrder(couponOrderData.orderUsingUserACouponCash1NotRebated).save();
  new couponOrder(couponOrderData.orderUsingUserACouponCash1Rebated).save();
  new couponOrder(couponOrderData.orderWithSaleRef).save();
  new couponOrder(couponOrderData.orderSaledBySalesDirectly).save();

  new user(userData.testAdmin1).save();
};
