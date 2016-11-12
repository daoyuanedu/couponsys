// Dependencies
var mongoose = require('mongoose');
var dbConsts = require('./dbConsts');

// Schema
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
  }
});

couponSchema.index({username: 1});

// Return Model
module.exports = mongoose.model('Coupon', couponSchema);

