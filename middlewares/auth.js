// Try to authenticate a user
exports.tryAuth = function (req, res, next) {
  //need to implement properly
  req.adminAuth = false;
  next();
};