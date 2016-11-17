// API data here used to support test that need special Json body

module.exports = {

  userAWithoutRules : {
    username : 'userA',
    mobile : '13898458462'
  },

  userAWithInvalidMobileWithoutRules : {
    username : 'userA',
    mobile : '03898458462'
  },

  userAWithoutMobile : {
    username : 'userA'
  },

  userAWithNullMobile : {
    username : 'userA',
    mobile: null
  },

  userAWithNullUser : {
    username : null,
    mobile : '13898458462'
  },

  userAWithRulesAndToken : {
    username : 'userA',
    mobile : '13898458462',
    couponRule: {
      type: 'PERCENTAGE',
      value: 50
    },
    rebateRule: {
      type: 'CASH',
      value: 1000
    },
    token: 'tobefilled'
  },

  userAWithIncompleteRulesAndToken : {
    username : 'userA',
    mobile : '13898458462',
    couponRule: {
      type: 'PERCENTAGE'
    },
    rebateRule: {
      type: 'CASH',
      value: 1000
    },
    token: 'tobefilled'
  },

  userAWithRulesNoToken : {
    username : 'userB',
    mobile : '13898458461',
    couponRule: {
      type: 'PERCENTAGE',
      value: 50
    },
    rebateRule: {
      type: 'CASH',
      value: 1000
    }
  }
};
