var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/modelCouponTestData');
var apiTestData = require('../../common/APICouponTestData');

var should = require('chai').should();

var path = '/api/v1/coupons/';

describe('/api/v1/coupons/', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  beforeEach(function (done) {
    Coupon.remove({}, done);
  });

  var userACouponPerc1 = couponData.userACouponPerc1;
  var userACouponCash1 = couponData.userACouponCash1;
  var user1Coupon = couponData.user1Coupon; 
  var userAWithPercRule = couponData.userAWithPercRule;
  var userBWithCashRule = couponData.userBWithCashRule;


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

    it.skip('should return one 20% discounted order value for userB by userA couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithCashRule).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458461' + '/discount')
          .query({ username : 'userB', orderValue : 1000 })
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.length.should.equal(1);
            var discountedOrder = res.body;
            discountedOrder.forEach(function (coupon) {
              discountedOrder.dicountedValue.should.equal(800);
            });
          })
          .end(done);
      }, done);
    });

    it.skip('should return one 800 order value for userA by userB couponID', function(done){
      var saveTwoCoupons = Promise.all(
        [new Coupon(userAWithPercRule).save(), 
        new Coupon(userBWithCashRule).save()]);
      
      saveTwoCoupons.then(function () {
        request.get(path + '13898458462' + '/discount')
          .query({ username : 'userA', orderValue : 1000 })
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.length.should.equal(1);
            var discountedOrder = res.body;
            discountedOrder.forEach(function (coupon) {
              discountedOrder.dicountedValue.should.equal(800);
            });
          })
          .end(done);
      }, done);
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
});