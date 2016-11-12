/**
 * Created by ekinr on 2016/10/29.
 */

var config = {
  debug: true,

  port: 3000,

  db: 'mongodb://127.0.0.1/daoyuanedu_prod',

  dbPath: 'C:\\Users\\ekinr\\Documents\\daoyuanschool\\db\\',

  defaultCouponRules : {
    couponRule: {
      type: 'CASH',
      value: 100
    },
    rebateRule: {
      type: 'CASH',
      value: 10
    }
  }
};

if (process.env.NODE_ENV === 'dev' || config.debug == true) {
  config.db = 'mongodb://127.0.0.1/daoyuanedu_dev';
}

module.exports = config;