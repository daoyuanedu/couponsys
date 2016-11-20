/**
 * Created by ekinr on 2016/11/10.
 */
var CouponOrderProxy = require('../../proxy/couponOrder.proxy.js');
var CouponProxy = require('../../proxy/coupon.proxy.js');

var Promise = require('bluebird');

var getOrdersByCouponCode = function (req, res, next) {
  var adminAuth = req.adminAuth;

  adminAuth = true; // TODO do we want auth?

  if (adminAuth) {
    var couponCode = req.params.couponCode;
    var rebated = req.query.rebated; // if undefined, show all.

    CouponOrderProxy.getOrdersByCouponCode(couponCode, rebated)
      .then(function (orders) {
        res.status = 200;
        res.send({orders: orders});
      })
      .catch(next);
  } else {
    var err = new Error('Only Admin can edit an order');
    err.status = 403;
    next(err);
  }
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;

var getOrderByOrderIdAndCouponCode = function (req, res, next) {
  var couponCode = req.params.couponCode;
  var orderId = req.params.orderId;

  CouponOrderProxy.getOrderByOrderIdAndCouponCode(orderId, couponCode)
    .then(function (order) {
      if (typeof order !== 'undefined' && order !== null)
        res.send(order);
      else {
        var err = new Error('Could not find order ' + orderId + ' under coupon ' + couponCode);
        err.status = 404;
        throw err;
      }
    }).catch(next);
};
exports.getOrderByOrderIdAndCouponCode = getOrderByOrderIdAndCouponCode;


// coupon code is valid && not belong to the user
// coupon code has a sales code ? => attach a sales ref
// no sales code? => create a sales code => attach a sales ref
var createNewCouponOrder = function (req, res, next) {
  var couponCode = req.params.couponCode;
  var username = req.body.username;
  var couponOrder = req.body;

  if (!username || !couponCode) {
    var err = new Error('Need to provide both username and couponcode');
    err.status = 406;
    next(err);
  }
  else {
    var isCouponBelongToUser = CouponProxy.isCouponBelongToUser(couponCode, username);
    var isCouponValid = CouponProxy.isCouponValid(couponCode);

    Promise.join(isCouponBelongToUser, isCouponValid, function (belong, valid) {
      return (!belong && valid);
    }).then(function (ableToUse) {
      if (ableToUse)
        return CouponOrderProxy.createNewOrder(couponOrder);
      else {
        var err = new Error('coupon code ' + couponCode + ' is not valid on user ' + username);
        err.status = 403;
        throw err;
      }
    }).then(function (createdOrder) {
      res.status(201);
      res.send(createdOrder);
    }).catch(function (err) {
      // MongoError Code
      if (err.code && err.code === 11000) {
        err.status = 406;
        err.message = 'order ID already exists.';
      }
      next(err);
    });
  }
};
exports.createNewCouponOrder = createNewCouponOrder;

//TODO: update salesRef
var updateCouponOrder = function (req, res, next) {
  if (req.adminAuth) {
    var couponCode = req.params.couponCode;
    var orderId = req.params.orderId;

    var rebated = req.query.rebated;
    var rebateValue = req.query.rebateValue;
    var propertiesToUpdate = {};
    var needToUpdate = false;

    if (typeof rebated !== 'undefined') {
      needToUpdate = true;
      propertiesToUpdate.rebated = rebated;
    }
    if (typeof rebateValue !== 'undefined') {
      propertiesToUpdate.rebateValue = rebateValue;
      needToUpdate = true;
    }
    if (needToUpdate) {
      CouponOrderProxy.updateOrderByOrderIdAndCouponCode(orderId, couponCode, propertiesToUpdate)
        .then(function () {
          res.status(204);
          res.send();
        }).catch(next);
    }
    else {
      res.status(200);
      res.send();
    }
  } else {
    var err = new Error('Only Admin can edit an order');
    err.status = 403;
    next(err);
  }
};
exports.updateCouponOrder = updateCouponOrder;
