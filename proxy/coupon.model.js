/**
 * Created by ekinr on 2016/11/3.
 *
 * A db proxy for Coupon model
 */
var Coupon = require('../models').Coupon;

exports.getCouponsByUsername = function (username) {
  //return a Promise
  return Coupon.find({ username : username}, {_id : 0, __v : 0});
};
