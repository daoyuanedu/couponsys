var couponProxy = require('../../proxy/coupon.proxy');

// Users Page
var userPage = function (req, res) {
  	res.render('pages/user/users');
};
exports.userPage = userPage;
