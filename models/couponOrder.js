/**
 * couponOrder represents an order with a coupon applied.
 */
var mongoose = require('mongoose');

var couponOrderSchema = mongoose.Schema({
  orderID : { required: true, type: String, unique: true},
  couponID: { required: true, type: String},
  orderName: { type: String },
  orderValue: {
    original: { type: Number, required: true },
    final: { type: Number, required: true }
  },
  rebated: { required: true, type: Boolean, default: false},
  rebateValue: { type: Number, default: 0}
});

couponOrderSchema.index({orderID : 1});

module.exports = mongoose.model("CouponOrder", couponOrderSchema);
