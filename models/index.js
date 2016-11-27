// Dependencies
var mongoose = require('mongoose');
var config = require('../config.default');
var logger = require('../common/logger');
mongoose.Promise = require('bluebird');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./coupon.model');
require('./couponOrder.model');
require('./user.model');

exports.Coupon = mongoose.model('Coupon');
exports.CouponOrder = mongoose.model('CouponOrder');
exports.User = mongoose.model('User');