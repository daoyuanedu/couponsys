/**
 * Created by ekinr on 2016/11/6.
 */

var Models = require('../../models');
var config = require('../../config.default');
var couponOrderData = require('../common/couponOrderTestData');
var CouponOrder = Models.CouponOrder;
var Promise = require('bluebird');

var couponModelproxy = require('../../proxy/couponOrder.model');

describe('CouponOrder Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Init test data
  var couponOrderNormal = couponOrderData.couponOrderNormal;
  var couponOrderWithSameCouponID = couponOrderData.couponOrderWithSameCouponID;

  beforeEach(function(done) {
    CouponOrder.remove({}, done);
  });

  it('totalOrdersByCouponId should return true if a coupon code is valid', function (done) {
    var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    twoSaves.then(function () {
      var queryPromise = couponModelproxy.totalOrdersByCouponId(couponOrderNormal.couponID);
      queryPromise.then(function (num) {
        num.should.equal(2);
        done();
      }, done);
    },done);
  });

  it('totalOrdersByCouponId should return 0 if no orders does not exit', function (done) {
    //var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    var queryPromise = couponModelproxy.totalOrdersByCouponId(couponOrderNormal.couponID);
    queryPromise.then(function (num) {
      num.should.equal(0);
      done();
    }, done);

  });

});