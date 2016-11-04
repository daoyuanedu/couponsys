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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },

  userACoupon1: {
    couponID: 'user1perc10',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    }
  },

  userACoupon2: {
    couponID: 'user1cash10',
    username: 'userA',
    couponRule: {
      type: 'PERCENTAGE',
      value: 10
    },
    rebateRule: {
      type: 'CASH',
      value: 100
    }
  }
};

