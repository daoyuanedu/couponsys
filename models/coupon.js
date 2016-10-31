// Dependencies
var mongoose = require('mongoose');

// Schema

var couponSchema = mongoose.Schema({
	username: String,
	couponRule: {
		type: String,
		value: Number
	},
	rebateRule: {
		type: String,
		value: Number
	}
});

// Return Model
var Coupon = module.exports = mongoose.model('Coupons', couponSchema);