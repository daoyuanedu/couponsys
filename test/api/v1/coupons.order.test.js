/**
 * API coupons/:couponID/orders/ TEST
 */

// Dependencies
var should = require('chai').should();
var expect = require('chai').expect;
var app = require('../../../app');
var request = require('supertest')(app);
var Models = require('../../../models');
var Coupon = Models.Coupon;
var CouponOrder = Models.CouponOrder;
var config = require('../../../config.default');
var Promise = require('bluebird');
var deepcopy = require('deepcopy');

// API path 
var path = ('/api/v1/coupons/');
var testToken = require('../../common/mockUsers').genTestToken();
// Test Sample Data
var userACoupon = require('../../common/modelCouponTestData').userACouponCash1;
var userARebatedOrder = require('../../common/modelCouponOrderTestData').orderUsingUserACouponCash1Rebated;
var userANonRebatedOrder = require('../../common/modelCouponOrderTestData').orderUsingUserACouponCash1NotRebated;
var userACouponOrderPost = require('../../common/modelCouponOrderTestData').postOrderUsingUserACoupon;

var userBCouponWithSalesACode = require('../../common/modelCouponTestData').userBCouponWithSalesACode;
var userBCouponWithCashRule = require('../../common/modelCouponTestData').userBWithCashRule;
var salesACoupon = require('../../common/modelCouponTestData').salesACoupon;
var salesBCoupon = require('../../common/modelCouponTestData').salesBCoupon;

describe('/coupons/{couponCode}/orders', function () {

  before(function (done) {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
    done();
  });

  beforeEach(function (done) {
    Coupon.remove({})
      .then(function () {
        return Promise.all([new Coupon(userACoupon).save(),
          new Coupon(salesACoupon).save(),
          new Coupon(salesBCoupon).save(),
          CouponOrder.remove({})]);
      })
      .then(function () {
        done();
      }).catch(done);
  });

  describe('GET', function () {

    it('should return all the orders used this particular coupon code', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path + userACoupon.couponID + '/orders')
          .query({token : testToken})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.orders.length.should.equal(2);
            done();
          });
      }).catch(done);
    });

    it('should only return non-rebated orders if rebated is set to false in the query param', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path + userACoupon.couponID + '/orders')
          .query({rebated: false, token : testToken})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.orders.length.should.equal(1);
            done();
          });
      }).catch(done);
    });

    it('should return all the orders with a linked sales ref to this coupon code if filter is not set', function (done) {
      var orderWithSalesRef = deepcopy(userANonRebatedOrder);
      orderWithSalesRef.orderID = 'userAOrderWithSalesRef';
      let rebateValue = 750, rebated = false, salesCode = 'IAMAFAKESALESCODE';
      orderWithSalesRef.salesRef = {salesCode: salesCode, rebated: rebated, rebateValue: rebateValue};

      var orderUsingSalesCodeDirect = deepcopy(userANonRebatedOrder);
      orderUsingSalesCodeDirect.orderID = 'userAUSINGSALESCODE';
      orderUsingSalesCodeDirect.couponID = salesCode;

      Promise.all([new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(),
        new CouponOrder(orderWithSalesRef).save()], new CouponOrder(orderUsingSalesCodeDirect).save())
        .then(function () {
          request.get(path + salesCode + '/orders')
            .query({rebated: false, token : testToken})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.orders.length.should.equal(2);
              done();
            });
        }).catch(done);
    });

    it('should return all the orders with a linked sales ref to this coupon code if filter is set to all', function (done) {
      var orderWithSalesRef = deepcopy(userANonRebatedOrder);
      orderWithSalesRef.orderID = 'userAOrderWithSalesRef';
      let rebateValue = 750, rebated = false, salesCode = 'IAMAFAKESALESCODE';
      orderWithSalesRef.salesRef = {salesCode: salesCode, rebated: rebated, rebateValue: rebateValue};

      var orderUsingSalesCodeDirect = deepcopy(userANonRebatedOrder);
      orderUsingSalesCodeDirect.orderID = 'userAUSINGSALESCODE';
      orderUsingSalesCodeDirect.couponID = salesCode;

      Promise.all([new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(),
        new CouponOrder(orderWithSalesRef).save()], new CouponOrder(orderUsingSalesCodeDirect).save())
        .then(function () {
          request.get(path + salesCode + '/orders')
            .query({filter : 'all', token : testToken})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.orders.length.should.equal(2);
              done();
            });
        }).catch(done);
    });

    it('should return only the direct orders if filter set to direct', function (done) {
      var orderWithSalesRef = deepcopy(userANonRebatedOrder);
      orderWithSalesRef.orderID = 'userAOrderWithSalesRef';
      let rebateValue = 750, rebated = false, salesCode = 'IAMAFAKESALESCODE';
      orderWithSalesRef.salesRef = {salesCode: salesCode, rebated: rebated, rebateValue: rebateValue};

      var orderUsingSalesCodeDirect = deepcopy(userANonRebatedOrder);
      orderUsingSalesCodeDirect.orderID = 'userAUSINGSALESCODE';
      orderUsingSalesCodeDirect.couponID = salesCode;

      Promise.all([new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(),
        new CouponOrder(orderWithSalesRef).save()], new CouponOrder(orderUsingSalesCodeDirect).save())
        .then(function () {
          request.get(path + salesCode + '/orders')
            .query({filter: 'direct', token : testToken})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.orders.length.should.equal(1);
              (res.body.orders[0].couponID).should.equal(salesCode);
              expect(res.body.orders[0].salesRef).to.be.undefined;
              done();
            });
        }).catch(done);
    });

    it('should return only the sales ref orders if filter set to salesRef', function (done) {
      var orderWithSalesRef = deepcopy(userANonRebatedOrder);
      orderWithSalesRef.orderID = 'userAOrderWithSalesRef';
      let rebateValue = 750, rebated = false, salesCode = 'IAMAFAKESALESCODE';
      orderWithSalesRef.salesRef = {salesCode: salesCode, rebated: rebated, rebateValue: rebateValue};

      var orderUsingSalesCodeDirect = deepcopy(userANonRebatedOrder);
      orderUsingSalesCodeDirect.orderID = 'userAUSINGSALESCODE';
      orderUsingSalesCodeDirect.couponID = salesCode;

      Promise.all([new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(),
        new CouponOrder(orderWithSalesRef).save()], new CouponOrder(orderUsingSalesCodeDirect).save())
        .then(function () {
          request.get(path + salesCode + '/orders')
            .query({filter: 'salesref', token : testToken})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.orders.length.should.equal(1);
              (res.body.orders[0].salesRef).should.eql(orderWithSalesRef.salesRef);
              done();
            });
        }).catch(done);
    });

  });

  describe('POST', function () {

    it('should create a new order with this coupon code', function (done) {
      var userBOrderUsingUserACoupon = deepcopy(userACouponOrderPost);
      userBOrderUsingUserACoupon.username = 'userB';

      request.post(path + userACoupon.couponID + '/orders')
        .send(userBOrderUsingUserACoupon)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if (err) done(err);
          else {
            var newOrder = res.body;
            (newOrder.orderID).should.equal(userBOrderUsingUserACoupon.orderID);
            (newOrder.orderValue.final).should.equal(userBOrderUsingUserACoupon.orderValue.final);
            (newOrder.orderValue.original).should.equal(userBOrderUsingUserACoupon.orderValue.original);

            CouponOrder.find({orderID: userBOrderUsingUserACoupon.orderID}).then(function (orders) {
              (orders.length).should.equal(1);
              done();
            });
          }
        });
    });

    it('should return an 403 Forbidden error if coupon code is not valid', function (done) {
      var userBOrderUsingUserACoupon = deepcopy(userACouponOrderPost);
      userBOrderUsingUserACoupon.username = 'userB';
      request.post(path + 'InvalidCouponCode' + '/orders')
        .send(userBOrderUsingUserACoupon)
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('should return an 403 Forbidden error if coupon code belongs to the user of this order', function (done) {
      var userAOrderUsingUserACoupon = deepcopy(userACouponOrderPost);
      userAOrderUsingUserACoupon.username = 'userA';
      request.post(path + userACoupon.couponID + '/orders')
        .send(userAOrderUsingUserACoupon)
        .set('Accept', 'application/json')
        .expect(403, done);
    });

    it('should return an 406 error if order with the same order id already exists', function (done) {
      var userBOrderUsingUserACoupon = deepcopy(userACouponOrderPost);
      userBOrderUsingUserACoupon.username = 'userB';
      new CouponOrder(userANonRebatedOrder).save()
        .then(function () {
          userBOrderUsingUserACoupon.orderID = userANonRebatedOrder.orderID;
          request.post(path + userACoupon.couponID + '/orders')
            .send(userBOrderUsingUserACoupon)
            .set('Accept', 'application/json')
            .expect(406)
            .end(done);
        });
    });

    it('should create a new order with the rebate value calculated', function (done) {
      var userBOrderUsingUserACoupon = deepcopy(userACouponOrderPost);
      userBOrderUsingUserACoupon.username = 'userB';

      request.post(path + userACoupon.couponID + '/orders')
        .send(userBOrderUsingUserACoupon)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err, res) {
          if (err) done(err);
          else {
            var newOrder = res.body;
            (newOrder.orderID).should.equal(userBOrderUsingUserACoupon.orderID);
            (newOrder.orderValue.final).should.equal(userBOrderUsingUserACoupon.orderValue.final);
            (newOrder.orderValue.original).should.equal(userBOrderUsingUserACoupon.orderValue.original);

            CouponOrder.findOne({orderID: userBOrderUsingUserACoupon.orderID}).then(function (order) {
              // perc 10
              (order.rebateValue).should.equal(order.orderValue.final * 0.1);
              done();
            }).catch(done);
          }
        });
    });


    it('should create a sales code on all the coupons belong to the user if using a sales coupon code', function (done) {
      var orderUsingSalesACode = deepcopy(userACouponOrderPost);
      orderUsingSalesACode.username = 'userA';
      orderUsingSalesACode.couponID = salesACoupon.couponID;
      request.post(path + orderUsingSalesACode.couponID + '/orders')
        .send(orderUsingSalesACode)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err) {
          if (err) done(err);
          else {
            Coupon.find({username: orderUsingSalesACode.username}).then(function (coupons) {
              (coupons.length).should.be.at.least(1);
              coupons.forEach(function (coupon) {
                (coupon.username).should.equal('userA');
                (coupon.salesCode).should.equal(salesACoupon.couponID);
              });
              done();
            }).catch(done);
          }
        });
    });

    it('should not update the sales code on the coupon if coupon has a sales code already', function (done) {
      new Coupon(userBCouponWithSalesACode).save()
        .then(function () {
          var orderUsingSalesBCode = deepcopy(userACouponOrderPost);
          orderUsingSalesBCode.username = 'userB';
          orderUsingSalesBCode.couponID = salesBCoupon.couponID;
          request.post(path + orderUsingSalesBCode.couponID + '/orders')
            .send(orderUsingSalesBCode)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err) {
              if (err) done(err);
              else {
                Coupon.find({username: orderUsingSalesBCode.username}).then(function (coupons) {
                  (coupons.length).should.be.at.least(1);
                  coupons.forEach(function (coupon) {
                    (coupon.salesCode).should.equal(salesACoupon.couponID);
                  });
                  done();
                });
              }
            });
        });
    });

    it('should create a same sales code with userB\'s for orders using userB\'s coupon code', function (done) {
      new Coupon(userBCouponWithSalesACode).save()
        .then(function () {
          var userAOrderUsingUserBCoupon = deepcopy(userACouponOrderPost);
          userAOrderUsingUserBCoupon.couponID = userBCouponWithCashRule.couponID;
          userAOrderUsingUserBCoupon.username = userACoupon.username;
          request.post(path + userAOrderUsingUserBCoupon.couponID + '/orders')
            .send(userAOrderUsingUserBCoupon)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err) {
              if (err) done(err);
              else {
                Coupon.find({username: userAOrderUsingUserBCoupon.username}).then(function (coupons) {
                  (coupons.length).should.be.at.least(1);
                  coupons.forEach(function (coupon) {
                    (coupon.username).should.equal(userACoupon.username);
                    (coupon.salesCode).should.equal(userBCouponWithSalesACode.salesCode);
                  });
                  done();
                }).catch(done);
              }
            });
        }).catch(done);
    });

    it('should create a salesRef with rebate value 0 (but a correct order rebate value) for the order if the coupon code is a sales code', function (done) {
      var orderUsingSalesACode = deepcopy(userACouponOrderPost);
      orderUsingSalesACode.username = 'userA';
      orderUsingSalesACode.couponID = salesACoupon.couponID;
      request.post(path + orderUsingSalesACode.couponID + '/orders')
        .send(orderUsingSalesACode)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function (err) {
          if (err) done(err);
          else {
            CouponOrder.find({orderID: orderUsingSalesACode.orderID, 'salesRef.salesCode': salesACoupon.couponID})
              .then(function (orders) {
                (orders.length).should.be.at.least(1);
                orders.forEach(function (order) {
                  (order.salesRef.salesCode).should.equal(salesACoupon.couponID);
                  (order.salesRef.rebateValue).should.equal(0);
                  (order.salesRef.rebated).should.equal(true);
                  (order.rebateValue).should.equal(1000);
                  (order.rebated).should.equal(false);
                  (order.couponID).should.equal(orderUsingSalesACode.couponID);
                });
                done();
              }).catch(done);
          }
        });
    });

    it('should create a salesRef for the order if the coupon has a sales code attach to it', function (done) {
      new Coupon(userBCouponWithSalesACode).save()
        .then(function () {
          var userAOrderUsingUserBCoupon = deepcopy(userACouponOrderPost);
          userAOrderUsingUserBCoupon.couponID = userBCouponWithCashRule.couponID;
          userAOrderUsingUserBCoupon.username = userACoupon.username;
          request.post(path + userAOrderUsingUserBCoupon.couponID + '/orders')
            .send(userAOrderUsingUserBCoupon)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err) {
              if (err) done(err);
              else {
                CouponOrder.find({
                  orderID: userAOrderUsingUserBCoupon.orderID,
                  'salesRef.salesCode': salesACoupon.couponID
                })
                  .then(function (orders) {
                    (orders.length).should.be.at.least(1);
                    orders.forEach(function (order) {
                      (order.salesRef.salesCode).should.equal(salesACoupon.couponID);
                      // sales rebate rule cash 1000
                      (order.salesRef.rebateValue).should.equal(1000);
                      (order.salesRef.rebated).should.equal(false);
                      (order.couponID).should.equal(userBCouponWithCashRule.couponID);
                    });
                    done();
                  }).catch(done);
              }
            });
        }).catch(done);
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
          .query({rebateValue: newRebateValue, rebated: true, token: testToken})
          .expect(204)
          .end(function (err) {
            if (err) done(err);
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
        .query({rebateValue: newRebateValue, rebated: true, token: testToken})
        .expect(404, done);
    });

    it('should return 200 if nothing to update', function (done) {
      new CouponOrder(userANonRebatedOrder).save().then(function () {
        request.put(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
          .query({token: testToken})
          .expect(200, done);
      });
    });

    it('should return 403 if request is not admin auth', function (done) {
      new CouponOrder(userANonRebatedOrder).save().then(function () {
        var newRebateValue = 50;
        request.put(path + userACoupon.couponID + '/orders/' + userANonRebatedOrder.orderID)
          .query({rebateValue: newRebateValue, rebated: true})
          .expect(403, done);
      });
    });
  });

});

describe('/coupons/orders', function () {

  before(function (done) {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
    done();
  });

  beforeEach(function (done) {
    Coupon.remove({})
      .then(function () {
        return Promise.all([new Coupon(userACoupon).save(),
          new Coupon(salesACoupon).save(),
          new Coupon(salesBCoupon).save(),
          CouponOrder.remove({})]);
      })
      .then(function () {
        done();
      }).catch(done);
  });

  describe('GET', function () {

    it('should not get any orders if not admin authenticated', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path +'orders')
          .expect(403, done);
      }).catch(done);
    });

    it('should get all the orders if admin authenticated and no filters applied', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
      }).catch(done);
      request.get(path +'orders')
        .query({token : testToken})
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res) {
          (res.body.orders.length).should.equal(2);
        }).end(done);
    });

    it('should respect the rebated query param', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path +'orders')
          .query({token : testToken, rebated : false})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
            (res.body.orders.length).should.equal(1);
            (res.body.orders[0].orderID).should.equal(userANonRebatedOrder.orderID);
          }).end(done);
      }).catch(done);
    });

    it('should respect the since and until query params', function (done) {
      var oldDate = '2016-11-27';
      var now = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      new CouponOrder(userARebatedOrder).save()
        .then(function () {
          return new CouponOrder(userANonRebatedOrder).save();
        })
        .then(function () {
          request.get(path + 'orders')
            .query({token: testToken, since: oldDate})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) done(err);
              else {
                (res.body.orders.length).should.equal(2);
                return;
              }
            });
        })
        .then(function () {
          request.get(path + 'orders')
            .query({token: testToken, since: oldDate , until: now.toISOString().substring(0, 10)})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) done(err);
              else {
                (res.body.orders.length).should.equal(0);
                return;
              }
            });
        })
        .then(function () {
          request.get(path + 'orders')
            .query({token: testToken, since: oldDate , until: tomorrow.toISOString().substring(0, 10)})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) done(err);
              else {
                (res.body.orders.length).should.equal(2);
                return;
              }
            });
        })
        .then(function () {
          request.get(path + 'orders')
            .query({token: testToken, since: tomorrow.toISOString().substring(0, 10)})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) done(err);
              else {
                (res.body.orders.length).should.equal(0);
                done();
              }
            });
        })
        .catch(done);
    });
  });

  describe('GET /{orderId}', function() {
    it('should get order by its order Id', function (done) {
      Promise.join(new CouponOrder(userARebatedOrder).save(), new CouponOrder(userANonRebatedOrder).save(), function () {
        request.get(path +'orders/' + userARebatedOrder.orderID)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(function (res) {
            (res.body.orderID).should.equal(userARebatedOrder.orderID);
          }).end(done);
      }).catch(done);
    });
  });

});