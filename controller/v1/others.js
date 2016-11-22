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

// For UI test, need to delete later
var couponData = require('../../test/common/modelCouponTestData');
var couponOrderData = require('../../test/common/modelCouponOrderTestData');

var saveToUITest = function () {
   new coupon(couponData.userACouponPerc1).save();
   new coupon(couponData.userACouponCash1).save();
   new coupon(couponData.user1Coupon).save();
   new coupon(couponData.userAWithPercRule).save();
   new coupon(couponData.userBWithCashRule).save();
   new coupon(couponData.userBWithInvalidCoupon).save();

   new couponOrder(couponOrderData.orderUsingUserACouponCash1Rebated).save();
   new couponOrder(couponOrderData.orderUsingUserACouponCash1NotRebated).save();
   new couponOrder(couponOrderData.couponOrderNormal).save();
   new couponOrder(couponOrderData.couponOrderWithSameCouponID).save();
};