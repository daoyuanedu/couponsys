/**
 * Created by ekinr on 2016/11/4.
 */
var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var CouponOrder = Models.CouponOrder;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/modelCouponTestData');
var APICouponTestData = require('../../common/APICouponTestData');
var couponOrderData = require('../../common/modelCouponOrderTestData');


var path = '/api/v1/coupons/user/';

describe('/api/v1/coupons/user/{username}', function() {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  beforeEach(function (done) {
    Coupon.remove({}, function () {
      CouponOrder.remove({}, done);
    }, done);
  });
  describe('GET', function() {

    var userACouponPerc1 = couponData.userACouponPerc1;
    var userACouponCash1 = couponData.userACouponCash1;

    var couponOrderNormal = couponOrderData.couponOrderNormal;
    var couponOrderWithSameCouponID = couponOrderData.couponOrderWithSameCouponID;

    it('should return all the coupon codes for a specific user', function (done) {
      var saveTwoCoupons = Promise.all([new Coupon(userACouponPerc1).save(),
        new Coupon(userACouponCash1).save()]);
      saveTwoCoupons.then(function () {
        request.get(path + 'userA')
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.coupons.length.should.equal(2);
            var coupons = res.body.coupons;
            coupons.forEach(function (coupon) {
              coupon.username.should.equal('userA');
            });
          })
          .end(done);
      }, done);
    });

    it('should return total number of orders when showTotalOrderNumber is true', function (done) {
      var saveTwoCoupons = Promise.all([new Coupon(userACouponPerc1).save(),
        new Coupon(userACouponCash1).save()]);
      saveTwoCoupons.then(function () {
        var userACouponPerc1Order = couponOrderNormal;
        userACouponPerc1Order.couponID = userACouponPerc1.couponID;
        var userACouponCash1Order = couponOrderWithSameCouponID;
        userACouponCash1Order.couponID = userACouponCash1.couponID;
        var saveTwoCouponOrders = Promise.all([new CouponOrder(userACouponPerc1Order).save(), new CouponOrder(userACouponCash1Order).save()]);
        saveTwoCouponOrders.then(function () {
          request.get(path + 'userA')
            .query({showTotalOrderNumber: true})
            .expect('Content-Type', /json/)
            .expect(function (res) {
              res.body.totalCouponOrders.should.equal(2);
            })
            .end(done);
        }, done);

      }, done);
    });


  });

  describe('POST', function () {


    it('should create a new coupon for the user and return 201', function (done) {
      request.post(path + 'userA')
        .send({ mobile: APICouponTestData.userAWithoutRules.mobile})
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            var createdCoupon = res.body;
            request.get(path + 'userA')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body.coupons;
                coupons.filter(function (coupon) {
                  return coupon.couponID === createdCoupon.couponID;
                }).length.should.equal(1);
              })
              .end(done);
          }
        });
    });

    it('should not create a new coupon if mobile number is invalid', function (done) {
      request.post(path + 'userA')
        .send(APICouponTestData.userAWithInvalidMobileWithoutRules)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if(err) done(err);
          else {
            res.body.message.should.equal('Invalid Mobile Provided');
            request.get(path + 'userA')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body.coupons;
                coupons.length.should.equal(0);
              })
              .end(done);
          }
        });
    });

    it('should not create a new coupon if no mobile has been provided', function (done) {
      request.post(path + 'userA')
        .send(APICouponTestData.userAWithoutMobile)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if(err) done(err);
          else {
            res.body.message.should.equal('No Mobile Provided');
            request.get(path + 'userA')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body.coupons;
                coupons.length.should.equal(0);
              })
              .end(done);
          }
        });
    });


    it('should have the default coupon rule if not authorised', function (done) {
      request.post(path + 'userA')
        .send(APICouponTestData.userAWithRules)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            request.get(path + 'userA')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body.coupons;
                coupons.length.should.equal(1);
                coupons[0].couponRule.type.should.equal(config.defaultCouponRules.couponRule.type);
                coupons[0].couponRule.value.should.equal(config.defaultCouponRules.couponRule.value);
                coupons[0].rebateRule.type.should.equal(config.defaultCouponRules.rebateRule.type);
                coupons[0].rebateRule.value.should.equal(config.defaultCouponRules.rebateRule.value);
              })
              .end(done);
          }
        });

    });

    it.skip('should have the same coupon rule set by the authorised admin', function (done) {

    });

  });

});