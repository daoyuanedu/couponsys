/**
 * Proxy test for couponCoder
 */

// Dependencies
var Models = require('../../models');
var config = require('../../config.default');
var couponOrderData = require('../common/modelCouponOrderTestData');
var CouponOrder = Models.CouponOrder;
var Promise = require('bluebird');
var CouponOrderProxy = require('../../proxy/couponOrder.proxy.js');
var deepcopy = require('deepcopy');

var should = require('chai').should();

describe('CouponOrder Model Proxy', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Test Sample Data
  var couponOrderNormal = couponOrderData.couponOrderNormal;
  var couponOrderWithSameCouponID = couponOrderData.couponOrderWithSameCouponID;

  beforeEach(function (done) {
    CouponOrder.remove({}, done);
  });

  it('totalOrdersByCouponCode should return the number of orders if a coupon code is valid', function (done) {
    var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    twoSaves.then(function () {
      var queryPromise = CouponOrderProxy.totalOrdersByCouponCode(couponOrderNormal.couponID);
      queryPromise.then(function (num) {
        num.should.equal(2);
        done();
      }, done);
    }, done);
  });

  it('totalOrdersByCouponCode should return 0 if no orders does not exit', function (done) {
    //var twoSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()]);
    var queryPromise = CouponOrderProxy.totalOrdersByCouponCode(couponOrderNormal.couponID);
    queryPromise.then(function (num) {
      num.should.equal(0);
      done();
    }, done);
  });

  it('getOrdersBySalesCode should get orders by its sales code and other filters', function (done) {

    var orderWithSalesRef = deepcopy(couponOrderNormal);
    orderWithSalesRef.salesRef = {salesCode: 'IAMASALESCODE', rebated: false, rebateValue: 800};

    new CouponOrder(orderWithSalesRef).save()
      .then(function () {
        CouponOrderProxy.getOrdersBySalesCode(orderWithSalesRef.salesRef.salesCode)
          .then(function (orders) {
            orders.length.should.equal(1);
            orders.forEach(function (order) {
              (order.salesRef.salesCode).should.equal(orderWithSalesRef.salesRef.salesCode);
              (order.salesRef.rebateValue).should.equal(orderWithSalesRef.salesRef.rebateValue);
              (order.salesRef.rebated).should.equal(false);
            });
            return;
          })
          .then(function () {
            return CouponOrderProxy.getOrdersBySalesCode(orderWithSalesRef.salesRef.salesCode, true);
          })
          .then(function (orders) {
            orders.length.should.equal(0);
            done();
          }).catch(done);
      });
  });

  it('getOrdersBySalesCode should only return the orders with the sales code ref', function (done) {
    var orderWithSalesRef = deepcopy(couponOrderNormal);
    orderWithSalesRef.orderID = 'SOMETHINGDIFFERENT';
    orderWithSalesRef.salesRef = {salesCode: 'IAMASALESCODE', rebated: false, rebateValue: 800};

    var threeSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()], new CouponOrder(orderWithSalesRef).save());
    threeSaves.then(function () {
      CouponOrderProxy.getOrdersBySalesCode(orderWithSalesRef.salesRef.salesCode)
        .then(function (orders) {
          orders.length.should.equal(1);
          orders.forEach(function (order) {
            (order.salesRef.salesCode).should.equal(orderWithSalesRef.salesRef.salesCode);
            (order.salesRef.rebateValue).should.equal(orderWithSalesRef.salesRef.rebateValue);
            (order.salesRef.rebated).should.equal(false);
          });
          return;
        })
        .then(function () {
          return CouponOrderProxy.getOrdersBySalesCode(couponOrderNormal.couponID);
        })
        .then(function (orders) {
          orders.length.should.equal(0);
          done();
        }).catch(done);
    });
  });

});