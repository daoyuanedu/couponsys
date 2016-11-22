// CouponOrder data here used to support test that need couponOrder

module.exports = {

  couponOrderNormal: {
    orderID: 'normal1order',
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithSameOrderID: {
    orderID: 'normal1order',
    couponID: 'coupon2normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithSameCouponID: {
    orderID: 'normal2order',
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutOrderID: {
    orderID: null,
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },


  couponOrderWithoutCouponID: {
    orderID: 'normal1order',
    couponID: null,
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },


  couponOrderWithoutRebated: {
    orderID: 'normal1order',
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: null,
    rebateValue: 0
  },


  couponOrderWithoutOriginValue: {
    orderID: 'normal1order',
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: null,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutFinalValue: {
    orderID: 'normal1order',
    couponID: 'coupon1normal',
    orderName: 'normal1order',
    orderValue: {
      original: 1000,
      final: null
    },
    rebated: false,
    rebateValue: 0
  },

  couponOrderWithoutOrderName: {
    orderID: 'normal1order',
    couponID: 'coupon1normal',
    orderName: null,
    orderValue: {
      original: 1000,
      final: 800
    },
    rebated: false,
    rebateValue: 0
  },

  orderUsingUserACouponCash1NotRebated : {
    orderID: 'orderUsingUserACouponCash1NotRebated',
    couponID: 'userAcash10',
    orderName: 'testUserA',
    orderValue: {
      original: 1000,
      final: 900
    },
    rebated: false,
    rebateValue: 100
  },

  orderUsingUserACouponCash1Rebated : {
    orderID: 'orderUsingUserACouponCash1Rebated',
    couponID: 'userAcash10',
    orderName: 'testUserA',
    orderValue: {
      original: 1000,
      final: 900
    },
    rebated: true,
    rebateValue: 100
  },

  postOrderUsingUserACoupon : {
    orderID : 'postOrderUsingUserACoupon',
    couponID : 'userAcash10',
    orderValue: {
      original: 5000,
      final: 4900
    }
  }

};

