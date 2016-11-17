var couponProxy = require('../../proxy/coupon.model');

// List Coupons Page
var getCouponsList = function (req, res) {
  couponProxy.getAllCoupons().then(function (coupons) {
    res.status(200);
  	res.render('pages/coupons', 
  		{
  			CouponList: coupons
  		});
  });
};
exports.getCouponsList = getCouponsList;

// One Coupons Page
var getCouponCodesByCouponID = function (req, res, next) {
  var couponID = req.params.couponID;
  couponProxy.getCouponCodesByCouponCode(couponID).then(function (coupon) {
    res.status(200);
    res.render('modify/couponDetails', 
      {
        CouponList: coupon
      });
  }).catch(next);
};
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;