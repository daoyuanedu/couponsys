var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/modelCouponTestData');

var path = '/api/v1/coupons/';

describe('/api/v1/coupons/', function() {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  describe('GET', function() {

    beforeEach(function(done) {
      Coupon.remove({}, done);
    });

    var userACouponPerc1 = couponData.userACouponPerc1;
    var userACouponCash1 = couponData.userACouponCash1;
    var user1Coupon = couponData.user1Coupon; 

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
});