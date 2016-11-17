/**
 * Proxy test for coupon
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var couponData = require('../common/modelCouponTestData');
var Coupon = Models.Coupon;
var couponProxy = require('../../proxy/coupon.proxy.js');

describe('Coupon Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  beforeEach(function (done) {
    Coupon.remove({}, done);
  });

  // Test Sample data
  var user1Coupon = couponData.user1Coupon;
  var userACoupon1NotValid = couponData.userACoupon1NotValid;
  var userAWithPercRule = couponData.userAWithPercRule;
  var userBWithCashRule = couponData.userBWithCashRule;

  it('isCouponValid should return true when coupon is valid', function (done) {
    var coupon = new Coupon(user1Coupon);
    coupon.save(function (err) {
      if (err) done(err);
      else {
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
      if (err) done(err);
      else {
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
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);

    saveTwoCoupons.then(function () {
      var discountOrderProxy = couponProxy.getDiscountedValue(
        userAWithPercRule.couponID, 1000);
      discountOrderProxy.then(function (discountOrder) {
        discountOrder.dicountedValue.should.equal(800);
        done();
      }, done);
    });
  });

  it('getDiscountedValue should return -200 value when use percentage rule', function (done) {
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);

    saveTwoCoupons.then(function () {
      var discountOrderProxy = couponProxy.getDiscountedValue(
        userBWithCashRule.couponID, 1000);
      discountOrderProxy.then(function (discountOrder) {
        discountOrder.dicountedValue.should.equal(800);
        done();
      }, done);
    });
  });

  it('isBelongToUsers should return true if the user have this coupon', function (done) {
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);
    saveTwoCoupons.then(function () {
      couponProxy.isBelongToUsers('13898458461', 'userA').then(function (result) {
        result.should.equal(true);
        done();
      });
    });
  });

  it('isBelongToUsers should return false if the user do not have this coupon', function (done) {
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);
    saveTwoCoupons.then(function () {
      couponProxy.isBelongToUsers('13898458461', 'userB').then(function (result) {
        result.should.equal(false);
        done();
      });
    });
  });

  it('deleteCouponCodesByCouponCode should delete one coupon by couponCode', function (done) {
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);

    saveTwoCoupons.then(function () {
      couponProxy.deleteCouponCodesByCouponCode('13898458461').then(function (result) {
        result.couponID.should.equal('13898458461');
        Coupon.count({}, function (err, count) {
          count.should.equal(1);
        });
        done();
      });
    });
  });

  it('deleteCouponCodesByCouponCode should not delete coupons by wrong couponCode', function (done) {
    var saveTwoCoupons = Promise.all(
      [new Coupon(userAWithPercRule).save(), new Coupon(userBWithCashRule).save()]);

    saveTwoCoupons.then(function () {
      couponProxy.deleteCouponCodesByCouponCode('wrong').then(function (result) {
        if (result !== null) done(new Error());
        Coupon.count({}, function (err, count) {
          count.should.equal(2);
        });
        done();
      });
    });
  });
});
