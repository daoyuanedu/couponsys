/**
 * Created by ekinr on 2016/10/29.
 */

var path = require('path');

var config = {
  debug: true,

  port: 3000,

  db: 'mongodb://127.0.0.1/daoyuanedu_prod',
};

if (process.env.NODE_ENV === 'dev' || config.debug == true) {
  config.db = 'mongodb://127.0.0.1/daoyuanedu_dev';
}

module.exports = config;