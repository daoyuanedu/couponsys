var config = require('../config.default');

var env = process.env.NODE_ENV || 'dev';

var winston = require('winston');
require('winston-daily-rotate-file');

var rotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: env === 'dev' ? 'debug' : 'info',
  prettyPrint: true,
  humanReadableUnhandledException: true,
  json: false
});

var logger = new (winston.Logger)({
  transports: [
    rotateFileTransport
  ]
});
/*
var log4js = require('log4js');
log4js.configure({
  appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
  ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR');
*/

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};