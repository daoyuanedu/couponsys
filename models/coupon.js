// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

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
	},
	signedToken: String
});

// Return Model
module.exports = restful.model('Coupons', couponSchema);