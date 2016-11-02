var Models = require('../../models');
var config = require('../../config.default');

describe("CouponOrder Model", function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  var couponOrderNormal = {
    orderID : "normal1order",
    couponID: "coupon1normal",
    rebated: false,
    rebateValue: 0
  };

  var couponOrderWithSameOrderID = {
    orderID : "normal1order",
    couponID: "coupon2normal",
    rebated: false,
    rebateValue: 0
  };

  var couponOrderWithSameCouponID = {
    orderID : "normal2order",
    couponID: "coupon1normal",
    rebated: false,
    rebateValue: 0
  };

  var couponOrderWithoutOrderID = {
    orderID : null,
    couponID: "coupon1normal",
    rebated: false,
    rebateValue: 0
  };

  var couponOrderWithoutCouponID = {
    orderID : "normal1order",
    couponID: null,
    rebated: false,
    rebateValue: 0
  };

  var couponOrderWithoutRebated = {
    orderID : "normal1order",
    couponID: "coupon1normal",
    rebated: null,
    rebateValue: 0
  };

  var CouponOrder = Models.CouponOrder;

  //We need to REALLY careful here as well that we are using dev db!
  beforeEach(function(done) {
    CouponOrder.remove({}, done);
  });

  it("should be able to save a couponOrder to the db", function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(done);
  });

  it("should not be able to save a non-orderId couponOrder to the db", function(done)) {
    var couponOrder = new CouponOrder(couponOrderWithoutOrderID);
    couponOrder.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

  it("should not be able to save a non-couponID couponOrder to the db", function(done)) {
    var couponOrder = new CouponOrder(couponOrderWithoutCouponID);
    couponOrder.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

 it("should not be able to save a non-rebated couponOrder to the db", function(done)) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

  it("should read an exiting couponOrder from the db", function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(function (err) {
      if(err) done(err);
      else{
        CouponOrder.findOne({orderID : 'normal1order'}, function (err, couponOrder) {
          if(err) throw done(err);
          else{
            (couponOrder.couponID).should.equal('coupon1normal');
            (couponOrder.couponID).should.equal(couponOrderNormal.couponID);
            done();
          }
        })
      }
    });
  });

  it("should failed to save conponOrders with same orderID", function (done) {
    var couponOrder = new CouponOrder(normal1order);
    var sameCouponOrder = new CouponOrder(couponOrderWithSameOrderID);
    CouponOrder.save(function (err) {
      if(err) done(err);
      else{
        sameCouponOrder.save(function (err)) {
          if(err) done(); 
          else {
            throw done(err);
          }
        });
      }
    }
  });

  it("should be able to save conponOrders with same CouponID", function (done) {
    var couponOrder = new CouponOrder(normal1order);
    var sameCouponOrder = new CouponOrder(couponOrderWithSameCouponID);
    CouponOrder.save(function (err) {
      if(err) done(err);
      else{
        sameCouponOrder.save(function (err)) {
          if(err) done(err); 
          else {
            done();
          }
        });
      }
    }
  });

});