// Coupon data here used to support test that need Coupon Data

module.exports = {

  user1Coupon: {
    couponID: 'user1perc10',
    username: 'user1',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  user1CouponWithSameCouponID: {
    couponID: 'user1perc10',
    username: 'user1',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  user1CouponWithSameUserID: {
    couponID: 'user1perc20',
    username: 'user1',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },


  couponWithoutID: {
    couponID: null,
    username: 'user1',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },


  couponWithoutUsername: {
    couponID: 'user1perc10',
    username: null,
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },


  userCouponWithInvalidType: {
    couponID: 'user1perc10',
    username: 'user1',
    couponRule: {
      type: 'INVALIDEE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  userACoupon1NotValid: {
    couponID: 'userAperc10',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: false
  },

  userACouponPerc1: {
    couponID: 'userAperc10',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  userACouponCash1: {
    couponID: 'userAcash10',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    valid: true
  },

  userAWithPercRule: {
    couponID: '13898458461',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 20
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  userBWithCashRule: {
    couponID: '13898458462',
    username: 'userB',
    couponRule: {
      type: 'CASH',
      value: 200
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true
  },

  userBWithInvalidCoupon: {
    couponID: '13898458460',
    username: 'userB',
    couponRule: {
      type: 'CASH',
      value: 200
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: false
  },


  salesACoupon : {
    username : 'salesA',
    couponID : '13445263873',
    couponRule: {
      type: 'PERCENTAGE',
      value: 50
    },
    rebateRule: {
      type: 'CASH',
      value: 1000
    },
    couponType: 'SALES',
    valid: true
  },

  salesBCoupon : {
    username : 'salesB',
    couponID : '13445263872',
    couponRule: {
      type: 'CASH',
      value: 500
    },
    rebateRule: {
      type: 'PERCENTAGE',
      value: 20
    },
    couponType: 'SALES',
    valid: true
  },

  userACouponWithSalesACode : {
    couponID: '13898458460',
    username: 'userA',
    couponRule: {
      type: 'CASH',
      value: 200
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true,
    salesCode: '13445263873'
  },

  userBCouponWithSalesACode : {
    couponID: '13898458462',
    username: 'userB',
    couponRule: {
      type: 'CASH',
      value: 200
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    },
    valid: true,
    salesCode: '13445263873'
  }

};


