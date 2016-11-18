/**
 * API coupons/:couponID/ TEST
 */

// Dependencies
var app = require('../../../app');
var request = require('supertest')(app);
var Models = require('../../../models');
var Coupon = Models.Coupon;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/modelCouponTestData');
var apiTestData = require('../../common/APICouponTestData');
var should = require('chai').should();

// API path 
var path = '/api/v1/coupons/';

describe('/api/v1/coupons/', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  beforeEach(function (done) {
    Coupon.remove({}, done);
  });

  // Test Sample Data
  var userACouponPerc1 = couponData.userACouponPerc1;
  var userACouponCash1 = couponData.userACouponCash1;
  var user1Coupon = couponData.user1Coupon;
  var userAWithPercRule = couponData.userAWithPercRule;
  var userBWithCashRule = couponData.userBWithCashRule;
  var userBWithInvalidCoupon = couponData.userBWithInvalidCoupon;

  describe('GET', function () {

    it('should list and return all coupons', function (done) {
      var saveThreeCoupons = Promise.all(
        [new Coupon(userACouponPerc1).save(),
          new Coupon(userACouponCash1).save(),
          new Coupon(user1Coupon).save()]);

      saveThreeCoupons.then(function () {
        request.get(path)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.length.should.equal(3);
            var coupons = res.body;
            coupons.forEach(function (coupon) {
              coupon.couponID.should.not.equal(null);
            });
          })
          .end(done);
      }, done);
    });

    it('should return one coupon codes by couponID', function (done) {
      var saveThreeCoupons = Promise.all(
        [new Coupon(userACouponPerc1).save(),
          new Coupon(userACouponCash1).save(),
          new Coupon(user1Coupon).save()]);

      saveThreeCoupons.then(function () {
        request.get(path + 'user1perc10')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
            var coupon = res.body;
            coupon.username.should.equal('user1');
          })
          .end(done);
      }, done);
    });

    it('should return a 20% discounted order value for userB by userA couponID', function (done) {
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(),
          new Coupon(userBWithCashRule).save()]);

      saveTwoCoupons.then(function () {
        request.get(path + '13898458461' + '/discount')
          .query({username: 'userB', orderValue: 1000})
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.dicountedValue.should.equal(800);
          })
          .end(done);
      }, done);
    });

    it('should return a -200 order value for userA by userB couponID', function (done) {
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(),
          new Coupon(userBWithCashRule).save()]);

      saveTwoCoupons.then(function () {
        request.get(path + '13898458462' + '/discount')
          .query({username: 'userA', orderValue: 1000})
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.dicountedValue.should.equal(800);
          })
          .end(done);
      }, done);
    });

    it('should not return a discounted order value for userA by userA couponID', function (done) {
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(),
          new Coupon(userBWithCashRule).save()]);

      saveTwoCoupons.then(function () {
        request.get(path + '13898458461' + '/discount')
          .query({username: 'userA', orderValue: 1000})
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (err) {
            if (err) done();
            else {
              err.should.not.equal(null);
              done();
            }
          }).end();
      });
    });

    it('should not return a discounted order value for userA by invalid couponID', function (done) {
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(),
          new Coupon(userBWithInvalidCoupon).save()]);

      saveTwoCoupons.then(function () {
        request.get(path + '13898458460' + '/discount')
          .query({username: 'userA', orderValue: 1000})
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (err) {
            if (err) done();
            else {
              err.should.not.equal(null);
              done();
            }
          }).end();
      });
    });

  });

  describe('POST', function () {

    it('should create a coupon for a new user and return 201', function (done) {
      request.post(path)
        .send({
          username: apiTestData.userAWithoutRules.username,
          mobile: apiTestData.userAWithoutRules.mobile
        })
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if (err) done(err);
          else {
            request.get(path + '13898458462')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupon = res.body;
                coupon.username.should.equal('userA');
              })
              .end(done);
          }
        });
    });


    it('should not create a new coupon if invalid mobile has been provided', function (done) {
      request.post(path)
        .send(apiTestData.userAWithInvalidMobileWithoutRules)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if (err) done(err);
          else {
            res.body.message.should.equal('Invalid Mobile Provided');
            request.get(path + 'userA')
              .expect(404, done);
          }
        });
    });

    it('should not create a new coupon if no mobile has been provided', function (done) {
      request.post(path)
        .send(apiTestData.userAWithNullMobile)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if (err) done(err);
          else {
            res.body.message.should.equal('No Mobile Provided');
            request.get(path + 'userA')
              .expect(404, done);
          }
        });
    });

    it('should have the default coupon rule if not authorised', function (done) {
      request.post(path)
        .send(apiTestData.userAWithRulesNoToken)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            request.get(path + apiTestData.userAWithRulesNoToken.mobile)
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupon = res.body;
                coupon.couponRule.type.should.equal(config.defaultCouponRules.couponRule.type);
                coupon.couponRule.value.should.equal(config.defaultCouponRules.couponRule.value);
                coupon.rebateRule.type.should.equal(config.defaultCouponRules.rebateRule.type);
                coupon.rebateRule.value.should.equal(config.defaultCouponRules.rebateRule.value);
              })
              .end(done);
          }
        });
    });
    var testToken = require('../../common/mockUsers').genTestToken();
    it('should have the user defined coupon rule if admin auth', function (done) {
      var couponWithToken = apiTestData.userAWithRulesAndToken;
      couponWithToken.token = testToken;
      request.post(path)
        .send(couponWithToken)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            request.get(path + couponWithToken.mobile)
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupon = res.body;
                coupon.couponRule.type.should.equal(couponWithToken.couponRule.type);
                coupon.couponRule.value.should.equal(couponWithToken.couponRule.value);
                coupon.rebateRule.type.should.equal(couponWithToken.rebateRule.type);
                coupon.rebateRule.value.should.equal(couponWithToken.rebateRule.value);
              })
              .end(done);
          }
        });
    });

    it('should handle incomplete user defined coupon rule if admin auth', function (done) {
      var incompleteCouponWithToken = apiTestData.userAWithIncompleteRulesAndToken;
      incompleteCouponWithToken.token = testToken;
      request.post(path)
        .send(incompleteCouponWithToken)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            request.get(path + incompleteCouponWithToken.mobile)
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupon = res.body;
                coupon.couponRule.type.should.equal(config.defaultCouponRules.couponRule.type);
                coupon.couponRule.value.should.equal(config.defaultCouponRules.couponRule.value);
                coupon.rebateRule.type.should.equal(incompleteCouponWithToken.rebateRule.type);
                coupon.rebateRule.value.should.equal(incompleteCouponWithToken.rebateRule.value);
              })
              .end(done);
          }
        });
    });

  });

  describe('DELETE', function () {

    it('should delete one coupon codes by couponID', function (done) {
      var saveCoupons = Promise.all(
        [new Coupon(userACouponPerc1).save(),
          new Coupon(userBWithInvalidCoupon).save()]);

      saveCoupons.then(function () {
        Coupon.count({}, function(err, count){
          count.should.equal(2);
        });
        request.delete(path + 'userAperc10')
          .expect(204)
          .expect(function (res) {
            Coupon.count({}, function(err, count){
              count.should.equal(1);
            });
          })
          .end(done);
      }, done);
    });

    //Should return an error code 403 FORBIDDEN
    it('should not delete coupons codes by wrong couponID', function (done) {
      var saveCoupons = Promise.all(
        [new Coupon(userACouponPerc1).save(),
          new Coupon(userBWithInvalidCoupon).save()]);

      saveCoupons.then(function () {
        request.del(path + 'wrongcode')
          //.expect(403)
          .end(function (err, res) {
            if (err) done(err);
            else {
              Coupon.count({}, function (err, count) {
                count.should.equal(2);
                done();
              });
            }
          });
      }, done);
    });
  });

  describe('PUT', function () {

    var testToken = require('../../common/mockUsers').genTestToken();

    it('should get a 403 FORBIDDEN if no token was passed in', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
        var testCoupon = {
          couponID: '13898458461', username: 'userB',
          couponRule: {type: 'CASH', value: 300},
          rebateRule: {type: 'PERCENTAGE', value: 10},
          valid: false
        };
        request.put(path + userAWithPercRule.couponID)
          .send(testCoupon)
          .expect(403, done);
      });
    });

    it('should get a 403 FORBIDDEN if wrong token was passed in', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
        var testCoupon = {
          couponID: '13898458461', username: 'userB',
          couponRule: {type: 'CASH', value: 300},
          rebateRule: {type: 'PERCENTAGE', value: 10},
          valid: false
        };
        testCoupon.token = 'fake';
        request.put(path + userAWithPercRule.couponID)
          .send(testCoupon)
          .expect(403, done);
      });
    });

    it('should update all details except couponCode of this coupon', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
        var newCouponDetails = {
          couponID: '13898458461', username: 'userB',
          couponRule: {type: 'CASH', value: 300},
          rebateRule: {type: 'PERCENTAGE', value: 10},
          valid: false,
          token: testToken
        };

        request.put(path + userAWithPercRule.couponID)
          .send(newCouponDetails)
          .expect(204)
          .end(function (err) {
            if (err) done(err);
            else {
              Coupon.findOne({couponID: userAWithPercRule.couponID})
                .then(function (coupon) {
                  (coupon.couponID).should.equal('13898458461');
                  (coupon.username).should.equal('userB');
                  (coupon.couponRule.type).should.equal('CASH');
                  (coupon.couponRule.value).should.equal(300);
                  (coupon.rebateRule.type).should.equal('PERCENTAGE');
                  (coupon.rebateRule.value).should.equal(10);
                  (coupon.valid).should.equal(false);

                  done();
                });
            }
          });
      });
    });

    it('should update couponRule properties details except couponCode and no changed properties of this coupon', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
        var newCouponDetails = {
          couponID: '13898458461', username: 'userB',
          couponRule: {type: 'CASH', value: 200},
          token: testToken
        };

        request.put(path + userAWithPercRule.couponID)
          .send(newCouponDetails)
          .expect(204)
          .end(function (err) {
            if (err) done(err);
            else {
              Coupon.findOne({couponID: userAWithPercRule.couponID})
                .then(function (coupon) {
                  // Update properties
                  (coupon.couponID).should.equal('13898458461');
                  (coupon.username).should.equal('userB');
                  (coupon.couponRule.type).should.equal('CASH');
                  (coupon.couponRule.value).should.equal(200);
                  // Origin properties
                  (coupon.rebateRule.type).should.equal('CASH');
                  (coupon.rebateRule.value).should.equal(100);
                  (coupon.valid).should.equal(true);
                  done();
                });
            }
          });
      });
    });

    it('should update random properties details except couponCode and no changed properties of this coupon', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
        var newCouponDetails = {
          couponID: '13898458461',
          couponRule: {type: 'CASH', value: 100},
          rebateRule: {type: 'CASH', value: 50},
          token: testToken
        };

        request.put(path + userAWithPercRule.couponID)
          .send(newCouponDetails)
          .expect(204)
          .end(function (err) {
            if (err) done(err);
            else {
              Coupon.findOne({couponID: userAWithPercRule.couponID})
                .then(function (coupon) {
                  // Update properties
                  (coupon.couponID).should.equal('13898458461');
                  (coupon.couponRule.type).should.equal('CASH');
                  (coupon.rebateRule.value).should.equal(50);
                  // Origin properties
                  (coupon.username).should.equal('userA');
                  (coupon.rebateRule.type).should.equal('CASH');
                  (coupon.couponRule.value).should.equal(100);
                  (coupon.valid).should.equal(true);
                  done();
                });
            }
          });
      });
    });

    it('should return 404 if coupon does not exist', function (done) {
      var newCouponDetails = {
        couponID: '13898458461', username: 'userB',
        couponRule: {type: 'CASH', value: 300},
        rebateRule: {type: 'PERCENTAGE', value: 10},
        valid: false,
        token: testToken
      };

      request.put(path + userAWithPercRule.couponID)
        .send(newCouponDetails)
        .expect(404, done);
    });
  });
});