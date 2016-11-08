
module.exports = {

  userAWithoutRules : {
    username : 'userA',
    mobile : '07873563123'
  },

  userAWithoutMobile : {
    username : 'userA'
  },

  userAWithRules : {
    username : 'userA',
    mobile : '07873563123',
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
