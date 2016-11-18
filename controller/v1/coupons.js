var couponProxy = require('../../proxy/coupon.proxy');

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
  couponProxy.getCouponCodeByCode(couponID).then(function (coupon) {
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
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;