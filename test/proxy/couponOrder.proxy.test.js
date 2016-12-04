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

  it('getOrders should return accept a valid since and until date filter', function (done) {
    var t1 = new Date();
    var t2;
    new CouponOrder(couponOrderNormal).save()
      .then(function () {
        t2 = new Date();
        return new CouponOrder(couponOrderWithSameCouponID).save();
      })
      .then(function () {
        return CouponOrderProxy.getOrders(null, new Date());
      })
      .then(function (orders) {
        (orders.length).should.equal(0);
        return CouponOrderProxy.getOrders(null, t1);
      })
      .then(function (orders) {
        (orders.length).should.equal(2);
        //orders[0].orderID.should.eql(couponOrderNormal.orderID);
        return CouponOrderProxy.getOrders(null, null, t1);
      })
      .then(function (orders) {
        (orders.length).should.equal(0);
        return CouponOrderProxy.getOrders(null, t1, t2);
      })
      .then(function (orders) {
        (orders.length).should.equal(1);
        orders[0].orderID.should.eql(couponOrderNormal.orderID);
        return CouponOrderProxy.getOrders(null, t2, new Date());
      })
      .then(function (orders) {
        (orders.length).should.equal(1);
        orders[0].orderID.should.eql(couponOrderWithSameCouponID.orderID);
        done();
      });
  });

  it('updateSalesRef should update a sales ref by order id and sales code', function (done) {
    var orderWithSalesRef = deepcopy(couponOrderNormal);
    orderWithSalesRef.orderID = 'SOMETHINGDIFFERENT';
    orderWithSalesRef.salesRef = {salesCode: 'IAMASALESCODE', rebated: false, rebateValue: 800};

    var threeSaves = Promise.all([new CouponOrder(couponOrderNormal).save(), new CouponOrder(couponOrderWithSameCouponID).save()], new CouponOrder(orderWithSalesRef).save());
    threeSaves.then(function () {
      CouponOrderProxy.updateOrderSalesRefByOrderId(orderWithSalesRef.orderID, orderWithSalesRef.salesRef.salesCode,
        {'salesRef.rebateValue': 1001})
        .then(function (order) {
          (order.salesRef.salesCode).should.equal(orderWithSalesRef.salesRef.salesCode);
          return;
        })
        .then(function () {
          return CouponOrderProxy.getOrderByOrderId(orderWithSalesRef.orderID);
        })
        .then(function (order) {
          (order.salesRef.rebateValue).should.equal(1001);
          (order.salesRef.rebated).should.equal(false);
          done();
        })
        .catch(done);
    });
  });

});