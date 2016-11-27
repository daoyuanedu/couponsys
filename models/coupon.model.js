// Dependencies
var mongoose = require('mongoose');
var dbConsts = require('./dbConsts');

// Schema
var couponSchema = mongoose.Schema(
  {
    couponID: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    couponRule: {
      type: {type: String, enum: dbConsts.couponRuleTypes, uppercase: true},
      value: {type: Number, min: 0}
    },
    rebateRule: {
      type: {type: String, enum: dbConsts.couponRuleTypes, uppercase: true},
      value: {type: Number, min: 0}
    },
    valid: {
      type: Boolean,
      default: true
    },
    couponType: {
      type: String,
      enum: dbConsts.couponTypes,
      uppercase: true,
      default: 'NORMAL',
      required: true
    },
    salesCode: {type: String} // use population? couponCode with type SALES, not really the right place for it...
  },
  {
    timestamps: true
  });

couponSchema.index({username: 1});
couponSchema.index({salesRef: 1});

//TODO: update middleware
couponSchema.pre('save', function (next) {
  var rebateRuleValid = true, couponRuleValid = true;
  if(this.rebateRule.type === 'PERCENTAGE') rebateRuleValid = this.rebateRule.value <= 100;
  if(this.couponRule.type === 'PERCENTAGE') couponRuleValid = this.couponRule.value <= 100;
  if(rebateRuleValid && couponRuleValid) {
    next();
  }
  else next(new Error('Rule value must <= 100 when use percentage rule'));
});

// Return Model
module.exports = mongoose.model('Coupon', couponSchema);

