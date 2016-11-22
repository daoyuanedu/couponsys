// Dependencies
var mongoose = require('mongoose');
var dbConsts = require('./dbConsts');

// Schema
// TODO: if type is PERCENTAGE value < 100
var couponSchema = mongoose.Schema({
  couponID: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  couponRule: {
    type: {type: String, enum: dbConsts.couponRuleTypes, uppercase: true},
    value: {type: Number}
  },
  rebateRule: {
    type: {type: String, enum: dbConsts.couponRuleTypes, uppercase: true},
    value: {type: Number}
  },
  valid: {
    type: Boolean,
    default: true
  },
  couponType : {
    type: String,
    enum: dbConsts.couponTypes,
    uppercase: true,
    default: 'NORMAL',
    required: true
  },
  salesCode : {type : String} // use population? couponCode with type SALES, not really the right place for it...
});

couponSchema.index({username: 1});
couponSchema.index({salesRef : 1});

// Return Model
module.exports = mongoose.model('Coupon', couponSchema);

