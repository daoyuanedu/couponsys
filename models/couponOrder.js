/**
 * couponOrder represents an order with a coupon applied.
 */
var mongoose = require('mongoose');

var salesRefSchema = mongoose.Schema({
  salesCode : {required : true, type : String},
  rebated : {required : true, type: Boolean, default : false},
  rebateValue : { type: Number, default : 0}
});

//TODO: original >= final; rebateValue < final, salesRef.rebateValue < final, final >= 0
var couponOrderSchema = mongoose.Schema({
  orderID : { required: true, type: String, unique: true},
  couponID: { required: true, type: String},
  orderValue: {
    original: { required: true, type: Number },
    final: { required: true, type: Number }
  },
  rebated: { type: Boolean, default: false},
  rebateValue: { type: Number, default: 0},
  salesRef: salesRefSchema
});

couponOrderSchema.index({ orderID : 1 });
couponOrderSchema.index({ couponID : 1 });
couponOrderSchema.index({ 'salesRef.salesCode' : 1, 'salesRef.rebated' : -1 });

module.exports = mongoose.model('CouponOrder', couponOrderSchema);
