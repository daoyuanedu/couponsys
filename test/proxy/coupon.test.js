/**
 * Created by ekinr on 2016/11/6.
 */

var Models = require('../../models');
var config = require('../../config.default');
var couponData = require('../common/modelCouponTestData');
var Coupon = Models.Coupon;

var couponProxy = require('../../proxy/Coupon.model');

describe('Coupon Model Proxy', function () {


  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Init test data
  var user1Coupon = couponData.user1Coupon;
  var userACoupon1NotValid = couponData.userACoupon1NotValid;
  var userAWithPercRule = couponData.userAWithPercRule;
  var userBWithCashRule = couponData.userBWithCashRule;


  beforeEach(function(done) {
    Coupon.remove({}, done);
  });

  it('isCouponValid should return true when coupon is valid', function (done) {
    var coupon = new Coupon(user1Coupon);
    coupon.save(function (err) {
      if(err) done(err);
      else{
        couponProxy.isCouponValid(user1Coupon.couponID).then(function (valid) {
          valid.should.equal(true);
          done();
        }, done);
      }
    });
  });

  it('isCouponValid should return false when coupon is not valid', function (done) {
    var coupon = new Coupon(userACoupon1NotValid);
    coupon.save(function (err) {
      if(err) done(err);
      else{
        couponProxy.isCouponValid(userACoupon1NotValid.couponID).then(function (valid) {
          valid.should.equal(false);
          done();
        }, done);
      }
    });
  });

  it('isCouponValid should return false when coupon does not exist', function (done) {
    //var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    var queryPromise = couponProxy.isCouponValid(user1Coupon.couponID);
    queryPromise.then(function (valid) {
      valid.should.equal(false);
      done();
    }, done);

  });

  it('getDiscountedValue should return -20% value when use percentage rule', function (done) {
    var discountOrder = couponProxy.getDiscountedValue(
      userAWithPercRule.couponRule.type, userAWithPercRule.couponRule.value, 1000);
      discountOrder.dicountedValue.should.equal(800);
      done();
  });

  it('getDiscountedValue should return -200 value when use percentage rule', function (done) {
    var discountOrder = couponProxy.getDiscountedValue(
      userBWithCashRule.couponRule.type, userBWithCashRule.couponRule.value, 1000);
      discountOrder.dicountedValue.should.equal(800);
      done();
  });

  it('isBelongToUsers should return true if the user have this coupon', function (done) {
    var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);
    saveTwoCoupons.then(function(){
      couponProxy.isBelongToUsers('13898458461', 'userA').then(function(result){
        result.should.equal(true);
        done();
      });
    });
  });

  it('isBelongToUsers should return false if the user do not have this coupon', function (done) {
    var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);
    saveTwoCoupons.then(function(){
      couponProxy.isBelongToUsers('13898458461', 'userB').then(function(result){
        result.should.equal(false);
        done();
      });
    });
  });
  

});