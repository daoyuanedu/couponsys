// Dependencies
var mongoose = require('mongoose');

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

var Order = module.exports = mongoose.model('Orders', orderSchema);

