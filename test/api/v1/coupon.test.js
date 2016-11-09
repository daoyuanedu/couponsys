var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/modelCouponTestData');
var apiTestData = require('../../common/APICouponTestData');

var path = '/api/v1/coupons/';

describe('/api/v1/coupons/', function() {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  beforeEach(function(done) {
      Coupon.remove({}, done);
  });

  var userACouponPerc1 = couponData.userACouponPerc1;
  var userACouponCash1 = couponData.userACouponCash1;
  var user1Coupon = couponData.user1Coupon; 

  describe('GET', function() {

    it('should list and return all coupons', function(done){
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

    it('should return one coupon codes by couponID', function(done){
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
  });

  describe('POST', function () {
    it('should create a coupon for a new user and return 201', function (done) {
      request.post(path + '13898458462')
        .send({ username: apiTestData.userAWithoutRules.username, 
          mobile: apiTestData.userAWithoutRules.mobile })
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            var createdCoupon = res.body;
            request.get(path + '13898458462')
              .expect('Content-Type', /json/)
              .expect(function (res) {
                res.body.length.should.equal(1);
                var coupons = res.body;
                coupons.forEach(function (coupon) {
                  coupon.username.should.equal('userA');
                });
              })
              .end(done);
          }
        });
    });

    it('should not create a new coupon if no match couponID-mobile has been provided', function (done) {
      request.post(path + '12345678942')
        .send(apiTestData.userAWithoutMobile)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if(err) done(err);
          else {
            res.body.message.should.equal('No Matched Mobile And CouponID / Both Undefined');
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

    it('should not create a new coupon if invalid mobile has been provided', function (done) {
      request.post(path + '03898458462')
        .send(apiTestData.userAWithInvalidMobileWithoutRules)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if(err) done(err);
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
      request.post(path + null)
        .send(apiTestData.userAWithNullMobile)
        .set('Accept', 'application/json')
        .expect(406)
        .end(function (err, res) {
          if(err) done(err);
          else {
            res.body.message.should.equal('No Matched Mobile And CouponID / Both Undefined');
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