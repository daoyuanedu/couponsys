/**
 * Created by ekinr on 2016/11/3.
 *
 * route /coupons/user/
 */

var coupon = require('../../proxy/coupon.model');
var logger = require('../../common/logger');

var getCouponCodesByUser = function(req, res) {
  var username = req.params.username;
  coupon.getCouponCodesByUseName(username).then(function (coupons) {
    res.send(coupons);
  }, function (err) {
    logger.error(err);
    res.status(406);
  });
};

exports.getCouponCodesByUser = getCouponCodesByUser;

var createCouponForUser = function (req, res) {
  var username = req.param.username;
  res.send('unimplemented...' + username);
};

exports.createCouponForUser = createCouponForUser;

