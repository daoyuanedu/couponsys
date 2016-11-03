  // TODO let model test 'CouponOrder' use test data in this file

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