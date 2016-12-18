/**
 * Created by ekinr on 2016/11/3.
 *
 * A db proxy for Coupon model
 */
var Coupon = require('../models').Coupon;
var defaultRules = require('../config.default').defaultCouponRules;
var Promise = require('bluebird');
var logger = require('../common/logger');

exports.getAllCoupons = function () {
  return Coupon.find({}, {_id : 0, __v : 0});
};

exports.getCouponCodesByUsername = function (username) {
  return Coupon.find({ username : username }, { _id : 0, __v : 0 });
};

exports.getCouponByCouponCode = function (couponID) {
  return Coupon.findOne({ couponID : couponID }, { _id : 0, __v : 0 });
};

exports.deleteCouponByCouponCode = function (couponID) {
  return Coupon.findOneAndRemove({ couponID : couponID }, { _id : 0, __v : 0 });
};

exports.isCouponValid = function (couponId) {
  return Coupon.findOne({ couponID : couponId}).then(function (coupon) {
    if(coupon) return coupon.valid;
    else return false;
  });
};

exports.createCouponWithDefaultRulesForSpecifiedUser = function (username, couponId) {
  var newCoupon = {username : username, couponID : couponId,
    couponRule : defaultRules.couponRule, rebateRule : defaultRules.rebateRule};
  return new Coupon(newCoupon).save();
};

exports.createCouponWithRules = function (coupon) {
  // Is there an elegant way?
  if(typeof coupon.couponRule === 'undefined') coupon.couponRule = defaultRules.couponRule;
  if(typeof coupon.couponRule.type === 'undefined' || typeof coupon.couponRule.value === 'undefined')
    coupon.couponRule = defaultRules.couponRule;
  if(typeof coupon.rebateRule === 'undefined') coupon.rebateRule = defaultRules.rebateRule;
  if(typeof coupon.rebateRule.type === 'undefined' || typeof coupon.rebateRule.value === 'undefined')
    coupon.rebateRule = defaultRules.rebateRule;


  return new Coupon(coupon).save();
};

exports.isCouponBelongToUser = function (couponId, username) {
  return Coupon.findOne({ couponID : couponId} ).then (function (coupon){
    if(coupon) return coupon.username === username;
    else return false;
  });
};

exports.updateOrderByCouponID = function (couponCode, propertiesToUpdate) {
  return Coupon.findOne({couponID : couponCode}).then(function (coupon) {
    if(typeof coupon !== 'undefined' && coupon !== null){
      return Coupon.findByIdAndUpdate(coupon._id,  { $set : propertiesToUpdate });
    }
    else {
      var err =  new Error('Coupon ' + couponCode + ' does not exist.');
      err.status = 404;       
      throw err;
    }
  });
};

exports.getDiscountedValue = function (couponId, orderValue) {
  return Coupon.find({ couponID : couponId} ).then (function (coupons){
    var couponObject = coupons[0];
    var ruleType = couponObject.couponRule.type;
    var ruleValue = couponObject.couponRule.value;
    var discountedValue = 0 ;
 
    if (ruleType === 'PERCENTAGE')
    {
      discountedValue = orderValue * (100 - ruleValue) / 100;
    }
    else if (ruleType === 'CASH') 
    {
      discountedValue = orderValue - ruleValue;
    }
    else
    {
      discountedValue = orderValue;
    }
    discountedValue = parseInt(discountedValue);
    if (discountedValue < 0) {
      var err =  new Error('DiscountedValue is less then 0, Please check orderValue or coupon code.');
      err.status = 500;       
      throw err;
    }
    else {
      return { 'couponID': couponObject.couponID, 'discountedValue' : discountedValue };
    }
  });
};

exports.addSalesCodeToCouponsForUser = function (username, salesCode) {
  return Coupon.find({ username : username}).then(function (coupons) {
    return Promise.all(coupons.map(function (coupon) {
      if(coupon.couponType !== 'SALES' && typeof coupon.salesCode === 'undefined')
        return Coupon.findByIdAndUpdate(coupon._id, { $set : { salesCode : salesCode }});
      else {
        logger.info(coupon.username + ' is a sales coupon or has a sales code already therefore will not set the sales code to ' + salesCode);
        return false;
      }
    }));
  });
};