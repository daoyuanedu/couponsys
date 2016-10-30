/**
 * Created by ekinr on 2016/10/30.
 */

var config = require('../config');

var env = process.env.NODE_ENV || "dev"


var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
    ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;