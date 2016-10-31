// Dependencies
var mongoose = require('mongoose');

// Schema
var couponSchema = mongoose.Schema({
	username: { type: String, required: true },
	couponRule: {
		type: { type: String, enum: ['PERCENTAGE', 'CASH'], uppercase: true },
		value: Number
	},
	rebateRule: {
		type: { type: String, enum: ['PERCENTAGE', 'CASH'], uppercase: true },
		value: Number
	}
});


// Return Model
var Coupons = module.exports = mongoose.model('Coupons', couponSchema);

