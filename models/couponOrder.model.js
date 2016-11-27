/**
 * couponOrder represents an order with a coupon applied.
 */
var mongoose = require('mongoose');
var logger = require('../common/logger');

var salesRefSchema = mongoose.Schema({
  salesCode: {required: true, type: String},
  rebated: {required: true, type: Boolean, default: false},
  rebateValue: {type: Number, default: 0}
}, {_id: false});

var couponOrderSchema = mongoose.Schema(
  {
    orderID: {required: true, type: String, unique: true},
    couponID: {required: true, type: String},
    orderValue: {
      original: {required: true, type: Number},
      final: {required: true, type: Number}
    },
    rebated: {type: Boolean, default: false},
    rebateValue: {type: Number, default: 0},
    salesRef: salesRefSchema
  },
  {
    timestamps: true
  });

couponOrderSchema.index({orderID: 1});
couponOrderSchema.index({couponID: 1});
couponOrderSchema.index({'salesRef.salesCode': 1, 'salesRef.rebated': -1});

//TODO: update middleware
couponOrderSchema.pre('save', function (next) {
  if(this.orderValue.original < this.orderValue.final)
    next(new Error('order original value must >= its final value'));
  if(this.rebateValue > this.orderValue.final) {
    logger.error('order rebate value must <= order final value, set it to final value');
    this.rebateValue = this.orderValue.final;
  }
  if(typeof this.salesRef !== 'undefined' && this.salesRef.rebateValue > this.orderValue.final){
    logger.error('order sales ref rebate value must <= order final value, set it to final value');
    this.salesRef.rebateValue = this.orderValue.final;
  }
  next();
});

module.exports = mongoose.model('CouponOrder', couponOrderSchema);
