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

  var CouponOrder = Models.CouponOrder;

  //We need to REALLY careful here as well that we are using dev db!
  beforeEach(function(done) {
    CouponOrder.remove({}, done);
  });

  it("should be able to save a couponOrder to the db", function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(done);
  });

  it("should not be able to save a non-orderId couponOrder to the db", function(err)) {
    var couponOrder = new CouponOrder(couponOrderWithoutOrderID);
    couponOrder.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });

  it("should not be able to save a non-couponID couponOrder to the db", function(err)) {
    var couponOrder = new CouponOrder(couponOrderWithoutCouponID);
    couponOrder.save(function (err) {
      if(err) done();
      else{
        throw done(err);
      }
    });
  });


});