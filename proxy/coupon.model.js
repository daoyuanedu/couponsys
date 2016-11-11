/**
 * Created by ekinr on 2016/11/3.
 *
 * A db proxy for Coupon model
 */
var Promise = require('bluebird');
var Coupon = require('../models').Coupon;
var defaultRules = require('../config.default').defaultCouponRules;

exports.getAllCoupons = function () {
  return Coupon.find({}, {_id : 0, __v : 0});
};

exports.getCouponCodesByUsername = function (username) {
  //return a Promise
  return Coupon.find({ username : username}, {_id : 0, __v : 0});
};

exports.getCouponCodesByCouponCode = function (couponID) {
  //return a Promise
  return Coupon.find({ couponID : couponID}, {_id : 0, __v : 0});
};

exports.isCouponValid = function (couponId) {
  return Coupon.find({ couponID : couponId}).then(function (coupons) {
    if(coupons.length === 0) return false;
    else return coupons[0].valid;
  }, function (err) {
    return err;
  });
};

exports.createCouponWithDefaultRulesForSpecifiedUser = function (username, couponId) {
  var newCoupon = {username : username, couponID : couponId,
    couponRule : defaultRules.couponRule, rebateRule : defaultRules.rebateRule};
  return new Coupon(newCoupon).save();
};

exports.isBelongToUsers = function (couponId, username) {
  return Coupon.find({ couponID : couponId} ).then (function (coupons){
    return coupons[0].username === username;
  }, function (err) {
    return err;
  });
}

exports.getDiscountedValue = function (couponId, orderValue) {
  console.log(couponId + '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
  return Coupon.find({ couponID : couponId} ).then (function (coupons){
    var couponObject = coupons[0];
    console.log(couponObject + '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')

    var ruleType = couponObject.couponRule.type;
    var ruleValue = couponObject.couponRule.value;
    var dicountedValue = 0 ;
    console.log(ruleType + ruleValue + orderValue + dicountedValue + '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
 
    if (ruleType === 'PERCENTAGE')
    {
      dicountedValue = orderValue * (100 - ruleValue) / 100;
    }
    else if (ruleType === 'CASH') 
    {
      dicountedValue = orderValue - ruleValue;
    }
    else
    {
      dicountedValue = orderValue;
    }
    dicountedValue = parseInt(dicountedValue);
    console.log(dicountedValue + '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')

    return { 'couponID': couponObject.couponID, 'dicountedValue' : dicountedValue };

  }).then(function (discountedOrder) {
        console.log(discountedOrder + '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
    return discountedOrder;
  });
};