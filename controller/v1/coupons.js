var couponProxy = require('../../proxy/coupon.proxy.js');
var Coupon = require('../../models').Coupon;

// For UI test, need to delete later
var couponData = require('../../test/common/modelCouponTestData');
var saveToUITest = function () {
  new Coupon(couponData.userACouponPerc1).save();
  new Coupon(couponData.userACouponCash1).save();
  new Coupon(couponData.user1Coupon).save();
  new Coupon(couponData.userAWithPercRule).save();
  new Coupon(couponData.userBWithCashRule).save();
  new Coupon(couponData.userBWithInvalidCoupon).save();
};

// Coupons
var coupons = function (req, res) {
  saveToUITest();
  couponProxy.getAllCoupons().then(function (coupons) {
    res.render('pages/coupons',
      {
        CouponList: coupons
      });
  });
};
exports.coupons = coupons;