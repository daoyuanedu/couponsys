/**
 * Created by ekinr on 2016/11/4.
 */
var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var config = require('../../../config.default');
var Promise = require('bluebird');
var couponData = require('../../common/couponTestData');

var path = '/api/v1/coupons/user/';

describe('/api/v1/coupons/user/{username}', function() {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  describe('GET', function() {

    beforeEach(function(done) {
      Coupon.remove({}, done);
    });

    var userACoupon1 = couponData.userACoupon1;
    var userACoupon2 = couponData.userACoupon2;

    it('should return all the coupon codes for a specific user', function(done){
      var saveTwoCoupons = Promise.all([new Coupon(userACoupon1).save(), new Coupon(userACoupon2).save()]);
      saveTwoCoupons.then(function () {
        request.get(path + 'userA')
          .expect('Content-Type', /json/)
          .expect(function (res) {
            res.body.length.should.equal(2);
            var coupons = res.body;
            coupons.forEach(function (coupon) {
              coupon.username.should.equal('userA');
            });
          })
          .end(done);
      }, done);
    });



    describe('POST', function () {

      it.skip('should create a new coupon for the user', function (done) {


      });

      it.skip('should have the default coupon rule if not authorised', function (done) {

      });

      it.skip('should have the same coupon rule set by the authorised admin', function (done) {

      });

    });


  });
});