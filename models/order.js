// Dependencies
<<<<<<< HEAD
var mongoose = require('mongoose');
=======
var restful = require('node-restful');
var mongoose = restful.mongoose;
>>>>>>> 8203f2d999066b112cd130a999330d122debc0db

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

<<<<<<< HEAD
var Order = module.exports = mongoose.model('Orders', orderSchema);
=======
module.exports = restful.model('Orders', orderSchema);
>>>>>>> 8203f2d999066b112cd130a999330d122debc0db
