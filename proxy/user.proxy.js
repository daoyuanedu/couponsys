/**
 * Created by ekinr on 2016/11/17.
 */
var User = require('../models').User;

exports.findUserByUsername = function (username) {
  return User.findOne({ username : username }, { _id : 0, __v : 0 });
};


//TODO: proper validate user password
exports.validateUserWithPassword = function (username, password) {
  return User.findOne({ username : username })
    .then(function (user) {
      if (user.password === password) return user;
      else return false;
    });
};