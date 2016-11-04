var Models = require('../../models');
var config = require('../../config.default');
var couponOrderData = require('../common/couponOrderTestData');

describe('CouponOrder Model', function () {

  before(function () {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
  });

  // Init test data
  var couponOrderNormal = couponOrderData.couponOrderNormal;
  var couponOrderWithSameOrderID = couponOrderData.couponOrderWithSameOrderID;
  var couponOrderWithSameCouponID = couponOrderData.couponOrderWithSameCouponID;
  var couponOrderWithoutOrderID = couponOrderData.couponOrderWithoutOrderID;
  var couponOrderWithoutCouponID = couponOrderData.couponOrderWithoutCouponID;
  var couponOrderWithoutRebated = couponOrderData.couponOrderWithoutRebated;
  var couponOrderWithoutOrderName = couponOrderData.couponOrderWithoutOrderName;

  var CouponOrder = Models.CouponOrder;

  //We need to REALLY careful here as well that we are using dev db!
  beforeEach(function (done) {
    CouponOrder.remove({}, done);
  });

  it('should be able to save a couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(done);
  });

  it('should not be able to save a non-orderId couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutOrderID);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-couponID couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutCouponID);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-rebated couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-original-orderValue couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-final-orderValue couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        err.should.not.equal(null);
        done();
      }
    });
  });

  it('should not be able to save a non-original-orderValue couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        throw done(err);
      }
    });
  });

  it('should not be able to save a non-final-orderValue couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutRebated);
    couponOrder.save(function (err) {
      if (err) done();
      else {
        throw done(err);
      }
    });
  });

  it('should read an exiting couponOrder from the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(function (err) {
      if (err) done(err);
      else {
        CouponOrder.findOne({orderID: 'normal1order'}, function (err, couponOrder) {
          if (err) done();
          else {
            (couponOrder.couponID).should.equal('coupon1normal');
            (couponOrder.couponID).should.equal(couponOrderNormal.couponID);
            done();
          }
        });
      }
    });
  });

  it('should failed to save conponOrders with same orderID', function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    var sameCouponOrder = new CouponOrder(couponOrderWithSameOrderID);
    couponOrder.save(function (err) {
      sameCouponOrder.save(function (err) {
        if (err) done();
        else {
          err.should.not.equal(null);
          done();
        }
      });
    });
  });

  it('should be able to save conponOrders with same CouponID', function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    var sameCouponOrder = new CouponOrder(couponOrderWithSameCouponID);
    couponOrder.save(function (err) {
      sameCouponOrder.save(function (err) {
        if (err) throw done(err);
        else {
          done();
        }
      });
    });
  });

  it('should be able to save a non-orderName couponOrder to the db', function (done) {
    var couponOrder = new CouponOrder(couponOrderWithoutOrderName);
    couponOrder.save(done);
  });

  it('should find all the couponOrders under a couponId', function (done) {
    var couponOrder = new CouponOrder(couponOrderNormal);
    couponOrder.save(function (err) {
      if (err) done(err);
      else {
        var anothercouponOrder = couponOrderWithSameCouponID;
        new CouponOrder(anothercouponOrder).save(function (err) {
          if (err) done(err);
          else {
            CouponOrder.find({couponID: 'coupon1normal'}, function (err, couponOrders) {
              if (err) throw done(err);
              else {
                var total = 0;
                couponOrders.forEach(function (couponOrder) {
                  (couponOrder.couponID).should.equal('coupon1normal');
                  total++;
                });
                total.should.equal(2);
                done();
              }
            });
          }
        });
      }
    });
  });
});