/**
 * Created by ekinr on 2016/11/6.
 */
/**
 * Created by ekinr on 2016/11/6.
 */

var Models = require('../../models');
var config = require('../../config.default');
var couponData = require('../common/couponTestData');
var Coupon = Models.Coupon;

var couponProxy = require('../../proxy/coupon.model');

describe('Coupon Model Proxy', function () {


  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Init test data
  var user1Coupon = couponData.user1Coupon;
  var userACoupon1NotValid = couponData.userACoupon1NotValid;


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

});