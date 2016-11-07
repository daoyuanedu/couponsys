// Coupon data here used to support coupon.test.js test

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
      type: 'CASH',
      value: 100
    },
    valid: true
  }
};


