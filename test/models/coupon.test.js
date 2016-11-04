/**
 * Created by ekinr on 2016/11/1.
 */

var Models = require('../../models');
var config = require('../../config.default');
var Promise = require('bluebird');
var couponData = require(__dirname + '/couponTestData');

describe('Coupon Model', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Init test data
  var user1Coupon = couponData.user1Coupon;
  var user1CouponWithSameID = couponData.user1CouponWithSameID;
  var couponWithoutID = couponData.couponWithoutID;
  var couponWithoutUsername = couponData.couponWithoutUsername;

  var Coupon = Models.Coupon;

  //We need to REALLY careful here that we are using dev db!
  beforeEach(function(done) {
    Coupon.remove({}, done);
  });

  it('should be able to save a coupon to the db', function (done) {
    var coupon = new Coupon(user1Coupon);
    coupon.save(done);
  });

  it("should not be able to save a non-couponId coupon to the db", function(done) {
    var coupon = new Coupon(couponWithoutID);
    coupon.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

  it("should not be able to save a non-username coupon to the db", function(done) {
    var coupon = new Coupon(couponWithoutUsername);
    coupon.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

  it("should read an exiting coupon from the db", function (done) {
  it('should read an exiting coupon from the db', function (done) {
    var coupon = new Coupon(user1Coupon);
    coupon.save().then(function () {
      Coupon.findOne({username: 'user1'}, function (err, coupon) {
        if (err) throw done(err);
        else {
          (coupon.username).should.equal('user1');
          (coupon.couponID).should.equal(user1Coupon.couponID);
          done();
        }
      });
    }, done);
  });

  it('should find all the coupons under a username', function (done) {
    var coupon = new Coupon(user1Coupon);
    var user1AnotherCoupon = user1Coupon;
    user1AnotherCoupon.couponID = 'user1cash100';
    var anotherCoupon = new Coupon(user1AnotherCoupon);
    var saveTwoCoupons = Promise.all([coupon.save(), anotherCoupon.save()]);
    saveTwoCoupons.then(function () {
      Coupon.find({username: 'user1'}, function (err, coupons) {
        if (err) throw done(err);
        else {
          coupons.forEach(function (coupon) {
            (coupon.username).should.equal('user1');
          });
          coupons.length.should.equal(2);
          done();
        }
      });
    }, done);
  });

  it('should fail to save the same coupon code for a different user', function (done) {
    var coupon = new Coupon(user1Coupon);
    coupon.save(function (err) {
      if(err) done(err);
      else{
        var user2Coupon = user1Coupon;
        user2Coupon.username = 'user2';
        new Coupon(user2Coupon).save(function (err) {
          if(err) done();
          else {
            err.should.not.equal(null);
            done();
          }
        });
      }
    });
  });

  it('should only allow permitted rule type', function (done) {
    var invalidCoupon = user1Coupon;
    invalidCoupon.rebateRule.type = 'SOMETHING';
    new Coupon(invalidCoupon).save(function (err) {
      if(err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  });
  it("should failed to save conpons with same couponID", function (done) {
    var coupon = new Coupon(user1Coupon);
    var sameCoupon = new Coupon(user1CouponWithSameID);
    coupon.save(function (err) {
        sameCoupon.save(function (err) {
          if(err) done();
          else {
            throw done(err);
          }
        });
    });
  });

});