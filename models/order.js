// Dependencies
var mongoose = require('mongoose');

// Schema
var orderSchema = mongoose.Schema({
	orderId: { type: Number, required: true, unique: true },
	orderName: String,
	orderValue: {
		original: { type: Number, required: true },
		final: { type: Number, required: true }
	}
});

var Orders = module.exports = mongoose.model('Orders', orderSchema);
