var couponProxy = require('../../proxy/coupon.proxy');

// Users Page
var userPage = function (req, res) {
  	res.render('pages/users');
};
exports.userPage = userPage;
