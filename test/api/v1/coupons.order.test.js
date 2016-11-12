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

  var userACouponOrderPost =  require('../../common/modelCouponOrderTestData').postOrderUsingUserACoupon;

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

    it('should create a new order with this coupon code', function (done) {
      request.post(path + userACoupon.couponID + '/orders')
        .send(userACouponOrderPost)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if(err) done(err);
          else {
            var newOrder = res.body;
            (newOrder.orderID).should.equal(userACouponOrderPost.orderID);
            (newOrder.orderValue.final).should.equal(userACouponOrderPost.orderValue.final);
            (newOrder.orderValue.original).should.equal(userACouponOrderPost.orderValue.original);

            CouponOrder.find({orderID: userACouponOrderPost.orderID}).then(function (orders) {
              (orders.length).should.equal(1);
              done();
            });
          }
        });
    });

    it('should return an 403 Forbidden error if coupon code is not valid', function (done) {
      request.post(path + 'InvalidCouponCode' + '/orders')
        .send(userACouponOrderPost)
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('should return an 406 error if order with the same order id already exists', function (done) {
      new CouponOrder(userANonRebatedOrder).save()
        .then(function () {
          var userAOrderSameOrderId = userACouponOrderPost;
          userAOrderSameOrderId.orderID = userANonRebatedOrder.orderID;
          request.post(path + userACoupon.couponID + '/orders')
            .send(userAOrderSameOrderId)
            .set('Accept', 'application/json')
            .expect(406)
            .end(done);
        });
    });
  });

  describe('GET /{order}', function () {

    it('should get the details of this order', function (done) {
      new CouponOrder(userANonRebatedOrder).save().then(function () {
        request.get(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
            (res.body.orderID).should.equal(userANonRebatedOrder.orderID);
            (res.body.rebated).should.equal(userANonRebatedOrder.rebated);
            (res.body.orderValue.final).should.equal(userANonRebatedOrder.orderValue.final);
          })
          .end(done);
      }).catch(done);
    });

    it('should return 404 if order does not exit under this coupon code', function (done) {
      request.get(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(done);
    });
  });

  describe('PUT /{order}', function () {
    it('should update the details of this order', function (done) {
      new CouponOrder(userANonRebatedOrder).save().then(function () {
        var newRebateValue = 50;
        request.put(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
          .query({rebateValue : newRebateValue, rebated : true})
          .expect(204)
          .end(function (err) {
            if(err) done(err);
            else {
              CouponOrder.findOne({orderID: userANonRebatedOrder.orderID}).then(function (order) {
                (order.rebateValue).should.equal(newRebateValue);
                (order.rebated).should.equal(true);
                done();
              });
            }
          });
      });
    });

    it('should return 404 if order does not exist', function (done) {
      var newRebateValue = 50;
      request.put(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
        .query({rebateValue : newRebateValue, rebated : true})
        .expect(404, done);
    });

    it('should return 200 if nothing to update', function (done) {
      new CouponOrder(userANonRebatedOrder).save().then(function () {
        request.put(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
          .expect(200, done);
      });
    });

    it.skip('should return 403 if request is not admin auth', function (done) {

    });
  });

});