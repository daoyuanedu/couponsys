// @flow
var jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var UserProxy = require('../proxy/user.proxy');

var signSecret = require('../config.default').signSecret;
var tokenExpiresIn = require('../config.default').tokenExpiresIn;
var logger = require('../common/logger');

// Try to authenticate a user
exports.tryAuth = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, signSecret, function(err, decoded) {
      if (err) {
        req.adminAuth = false;
        logger.error('failed to the authenticate token: ' + token);
        err.status = 403;
        next(err);
      } else {
        logger.info('token authenticated');
        req.decoded = decoded;
        req.adminAuth = true;
        next();
      }
    });
  }
  else {
    logger.info('no token provided');
    req.adminAuth = false;
    next();
  }
};

exports.generateAdminToken = function (req, res, next) {
  if(req.user.userType === 'ADMIN') {
    req.token = jwt.sign({ user: req.user.username }, signSecret, { expiresIn: tokenExpiresIn });
    next();
  }
  else {
    var err = new Error('user type is ' + req.user.userType + ' no admin token generated');
    err.status = 401;
    logger.error(err);
    next(err);
  }
};

exports.sendToken = function (req, res, next) {
  if(req.token) res.json({ success: true, token: req.token });
  else {
    var err = new Error('No token generated');
    err.status = 401;
    next(err);
  }
};

exports.initPassportLocalStrategy = function () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      UserProxy.validateUserWithPassword(username, password)
      .then(function (user) {
        if(user) done(null, user);
        else done(null, false);
      })
      .catch(done);
    }
  ));

  // No session
  /*
  passport.serializeUser(function(user, cb) {
  cb(null, user);
});
*/
};
