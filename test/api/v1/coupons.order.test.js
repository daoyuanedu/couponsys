/**
 * Created by ekinr on 2016/11/10.
 */

var should = require('chai').Should();

var app = require('../../../app');
var request = require('supertest')(app);

var Models = require('../../../models');
var Coupon = Models.Coupon;
var CouponOrder = Models.CouponOrder;
var config = require('../../../config.default');
var Promise = require('bluebird');

var path = ('/api/v1/coupons/');
describe('/coupons/{couponCode}/orders', function () {

  var userACoupon = new Coupon(require('../../common/modelCouponTestData').userACouponCash1);
  var userARebatedOrder = require('../../common/modelCouponOrderTestData').orderUsingUserACouponCash1Rebated;
  var userANonRebatedOrder = require('../../common/modelCouponOrderTestData').orderUsingUserACouponCash1NotRebated;

  before(function (done) {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
    Coupon.remove({})
      .then(userACoupon.save(done))
      .catch(done);
  });

  beforeEach(function (done) {
    CouponOrder.remove({}, done);
  });

  describe('GET', function () {
    it('should return all the orders used this particular coupon code', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path + userACoupon.couponID + '/orders')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);
            res.body.orders.length.should.equal(2);
            done();
          });
      }).catch(done);
    });

    it('should only return non-rebated orders if rebated is set to false in the query param', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path + userACoupon.couponID + '/orders')
          .query({rebated: false})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);
            res.body.orders.length.should.equal(1);
            done();
          });
      }).catch(done);
    });

  });

  describe('POST', function () {

    it.skip('should create a new order with this coupon code', function (done) {

    });

  });

  describe('GET /{order}', function () {

    it.skip('should get the details of this order', function (done) {

    });

    it.skip('should return 404 if order does not exit under this coupon code', function (done) {

    });

  });

  describe('PUT /{order}', function () {
    it.skip('should update the details of this order', function (done) {

    });

  });

});