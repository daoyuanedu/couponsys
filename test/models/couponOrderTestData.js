// CouponOrder data here used to support couponOrder.test.js test

module.exports = {
  couponOrderNormal : {
    orderID : "normal1order",
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithSameOrderID : {
    orderID : "normal1order",
    couponID: "coupon2normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithSameCouponID : {
    orderID : "normal2order",
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutOrderID : {
    orderID : null,
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutCouponID : {
    orderID : "normal1order",
    couponID: null,
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutRebated : {
    orderID : "normal1order",
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: null,
    rebateValue: 0
  },

  couponOrderWithoutOriginValue : {
    orderID : "normal1order",
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: null,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutFinalValue : {
    orderID : "normal1order",
    couponID: "coupon1normal",
    orderName: "normal1order",
    orderValue: {
      original: 1000,
      final: null
    },
    rebated: false,
    rebateValue: 0
  },
}