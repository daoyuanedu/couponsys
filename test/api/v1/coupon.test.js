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
          .expect(function (res) {
            res.body.length.should.equal(1);
            var coupons = res.body;
            coupons.forEach(function (coupon) {
              coupon.username.should.equal('user1');
            });
          })
          .end(done);
      }, done);
    });

    it('should return a 20% discounted order value for userB by userA couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithCashRule).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458461' + '/discount')
          .query({ username : 'userB', orderValue : 1000 })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.dicountedValue.should.equal(800);
          })
          .end(done);
      }, done);
    });

    it('should return a -200 order value for userA by userB couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithCashRule).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458462' + '/discount')
          .query({ username : 'userA', orderValue : 1000 })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.dicountedValue.should.equal(800);
          })
          .end(done);
      }, done);
    });

    it('should not return a discounted order value for userA by userA couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithCashRule).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458461' + '/discount')
          .query({ username : 'userA', orderValue : 1000 })
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (err) {
            if(err) done();
            else {
              err.should.not.equal(null);
              done();
            }
          }).end();
      });
    });

    it('should not return a discounted order value for userA by invalid couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithInvalidCoupon).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458460' + '/discount')
          .query({ username : 'userA', orderValue : 1000 })
          .expect(500)
          .expect('Content-Type', /json/)
          .expect(function (err) {
            if(err) done();
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
                var coupons = res.body;
                coupons.length.should.equal(1);
                coupons.forEach(function (coupon) {
                  coupon.username.should.equal('userA');
                });
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
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body;
                coupons.length.should.equal(0);
              })
              .end(done);
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
              .expect('Content-Type', /json/)
              .expect(function (res) {
                var coupons = res.body;
                coupons.length.should.equal(0);
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
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
            res.body.couponID.should.equal('userAperc10');
            Coupon.count({}, function(err, count){
              count.should.equal(1);
            });
          })
          .end(done);
      }, done);
    });

    it('should not delete coupons codes by wrong couponID', function (done) {
      var saveCoupons = Promise.all(
        [new Coupon(userACouponPerc1).save(),
          new Coupon(userBWithInvalidCoupon).save()]);

      saveCoupons.then(function () {
        request.delete(path + 'wrongcode')
          .expect(200)
          .expect(function (res) {
            Coupon.count({}, function(err, count){
              count.should.equal(2);
            });
          })
          .end(done);
      }, done);
    });
  });

  describe('PUT', function() {

    it('should update the details of this coupon', function (done) {
      new Coupon(userAWithPercRule).save().then(function () {
      var newCouponDetails = {
        couponID: '13898458461', username: 'userB',
        couponRule: { type: 'CASH', value: 300 },
        rebateRule: { type: 'PERCENTAGE', value: 10 }, valid: false };
     
      request.put(path + userAWithPercRule.couponID)
        .send(newCouponDetails)
        .expect(204)
        .end(function (err) {
          if(err) done(err);
          else {
            Coupon.findOne({ couponID: userAWithPercRule.couponID})
            .then(function (coupon) {
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

    it('should return 404 if coupon does not exist', function (done) {
      var newCouponDetails = {
        couponID: '13898458461', username: 'userB',
        couponRule: { type: 'CASH', value: 300 },
        rebateRule: { type: 'PERCENTAGE', value: 10 }, valid: false };

      request.put(path + userAWithPercRule.couponID)
        .send(newCouponDetails)
        .expect(404, done);
    });
  });
});