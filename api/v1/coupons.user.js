/**
 * Created by ekinr on 2016/11/3.
 *
 * route /coupons/user/
 */

var coupon = require('../../proxy/coupon.model');
var couponOrder = require('../../proxy/couponOrder.model');

var Promise = require('bluebird');

var getCouponCodesByUser = function(req, res, next) {
  var username = req.params.username;

  var couponsPromise = coupon.getCouponCodesByUsername(username);
  if(req.query.showTotalOrderNumber){
    var totalOrderNumber = couponsPromise.then(function (coupons) {
      return Promise.all(coupons.map(function (coupon) {
        return couponOrder.totalOrdersByCouponId(coupon.couponID);
        }));
      }).then(function (orderNumberArray) {
        return orderNumberArray.reduce(function(a, b) {
          return a + b;
        }, 0);
      }).catch(next);
    Promise.join(totalOrderNumber, couponsPromise, function(orderNumber, coupons) {
      return {coupons : coupons, totalCouponOrders: orderNumber}
    }).then(function (resJson) {
      res.send(resJson);
    }).catch(next);
  }
  else{
    couponsPromise.then(function (coupons) {
      res.send({ coupons : coupons });
    }).catch(next);
  }
};
exports.getCouponCodesByUser = getCouponCodesByUser;

var createCouponForUser = function (req, res, next) {
  var username = req.params.username;
  if(req.adminAuth){
    next({message: 'unimplemented...'});
  }else{
    coupon.createCouponWithDefaultRulesForSpecifiedUser(username, req.couponCode).then(function (coupon) {
      res.statusCode = 201;
      res.send(coupon);
    }).catch(next);
  }
};
exports.createCouponForUser = createCouponForUser;

