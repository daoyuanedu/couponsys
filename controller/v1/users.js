var couponProxy = require('../../proxy/coupon.proxy');

// Users Page
var userPage = function (req, res) {
  	res.render('pages/users');
};
exports.userPage = userPage;

// Coupon List by User
var getCouponCodesByUser = function (req, res, next) {
  var username = req.params.username;
  couponProxy.getCouponCodesByUsername(username).then(function (coupons) {
    res.status(200);
  	res.render('modify/userDetails', 
  		{
  			userList: coupons
  		});
  }).catch(next);
};
exports.getCouponCodesByUser = getCouponCodesByUser;
