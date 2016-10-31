// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema

var orderSchema = mongoose.Schema({
	orderId: Number,
	orderName: String,
	orderValue: {
		original: Number,
		final: Number,
	},
	clientId: Number,
});

module.exports = restful.model('Orders', orderSchema);