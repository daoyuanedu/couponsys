// Dependencies
var mongoose = require('mongoose');

// Schema
var couponSchema = mongoose.Schema({
    couponID: { type: String, required: true, unique: true},
	username: { type: String, required: true },
	couponRule: {
		type: { type: String, enum: ['PERCENTAGE', 'CASH'], uppercase: true },
		value: { tupe: Number }
	},
	rebateRule: {
		type: { type: String, enum: ['PERCENTAGE', 'CASH'], uppercase: true },
		value: { type: Number }
	}
});


// Return Model
module.exports = mongoose.model('Coupon', couponSchema);

