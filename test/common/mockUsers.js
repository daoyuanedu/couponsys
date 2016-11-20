/**
 * Created by ekinr on 2016/11/17.
 */
var tokenExpiresIn = require('../../config.default').tokenExpiresIn;
var signSecret = require('../../config.default').signSecret;
var jwt = require('jsonwebtoken');


exports.testAdmin1 = {
  username : 'testAdmin1',
  password : 'testAdmin1',
  userType: 'ADMIN'
};

exports.genTestToken = function () {
  return jwt.sign({ user: 'testAdmin1' }, signSecret, { expiresIn: tokenExpiresIn });
};
