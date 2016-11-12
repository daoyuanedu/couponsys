/**
 * Proxy test for couponCoder
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var couponOrderData = require('../common/modelCouponOrderTestData');
var CouponOrder = Models.CouponOrder;
var Promise = require('bluebird');
var couponModelproxy = require('../../proxy/CouponOrder.model');

describe('CouponOrder Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Test Sample Data
  var couponOrderNormal = couponOrderData.couponOrderNormal;
  var couponOrderWithSameCouponID = couponOrderData.couponOrderWithSameCouponID;

  beforeEach(function(done) {
    CouponOrder.remove({}, done);
  });

  it('totalOrdersByCouponCode should return the number of orders if a coupon code is valid', function (done) {
    var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    twoSaves.then(function () {
      var queryPromise = couponModelproxy.totalOrdersByCouponCode(couponOrderNormal.couponID);
      queryPromise.then(function (num) {
        num.should.equal(2);
        done();
      }, done);
    },done);
  });

  it('totalOrdersByCouponCode should return 0 if no orders does not exit', function (done) {
    //var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    var queryPromise = couponModelproxy.totalOrdersByCouponCode(couponOrderNormal.couponID);
    queryPromise.then(function (num) {
      num.should.equal(0);
      done();
    }, done);
  });
});