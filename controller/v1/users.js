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
    if (coupons.length !== 0) {
      res.status(200);
      res.render('modify/userDetails', 
        {
          userList: coupons
        });
    } else {
      res.status(404);
      res.render('partials/noFoundError',
        {
          errorData: username
        });
    }
  }).catch(next);   
};
exports.getCouponCodesByUser = getCouponCodesByUser;
