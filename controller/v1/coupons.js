var CouponProxy = require('../../proxy/coupon.proxy');

// List Coupons Page
var getCouponsList = function (req, res) {
  CouponProxy.getAllCoupons().then(function (coupons) {
    res.status(200);
    res.render('pages/coupons',
      {
        CouponList: coupons
      });
  });
};
exports.getCouponsList = getCouponsList;

// One Coupons Page
var getCouponByCouponCode = function (req, res, next) {
  var couponID = req.params.couponID;
  CouponProxy.getCouponByCouponCode(couponID).then(function (coupon) {
    if (coupon !== null) {
      res.status(200);
      res.render('modify/couponDetails',
        {
          coupon: coupon
        });
    } else {
      res.status(404);
      res.render('partials/noFoundError',
        {
          errorData: couponID
        });
    }
  }).catch(next);
};
exports.getCouponByCouponCode = getCouponByCouponCode;