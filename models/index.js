// Dependencies

var mongoose = require('mongoose');

// models 
require('./coupon');
require('./order');

exports.Coupon = mongoose.model('Coupon');
exports.Order = mongoose.model('Order');

// TODO - Need to now how to use below code 
// This looks like everytime when connect to /index page
// This will connect to MongoDB or show err

// var config   = require('../config');
// var logger = require('../common/logger')

// mongoose.connect(config.db, {
//   server: {poolSize: 20}
// }, function (err) {
//   if (err) {
//     logger.error('connect to %s error: ', config.db, err.message);
//     process.exit(1);
//   }
// });
