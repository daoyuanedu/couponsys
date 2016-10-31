// Dependencies
var mongoose = require('mongoose');

// Schema
var orderSchema = mongoose.Schema({
	orderId: { type: Number, required: true, unique: true },
	orderName: { type: String },
	orderValue: {
		original: { type: Number, required: true },
		final: { type: Number, required: true }
	}
});

mongoose.model('Order', orderSchema);
