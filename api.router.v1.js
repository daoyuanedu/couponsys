/**
 * Created by ekinr on 2016/11/3.
 *
 * Routers for API paths
 */

// Dependencies
var express = require('express');
var info = require('./api/v1/info');
var user = require('./api/v1/coupons.user');
var coupon = require('./api/v1/coupons');
var couponOrder = require('./api/v1/coupons.order');
var auth = require('./middlewares/auth');
var couponCodeGenerator = require('./middlewares/couponCodeGenerator');
var errorHandler = require('./middlewares/errorHandler');

var passport = require('passport');


// Router
var router = express.Router();

// Others
router.get('/info', info);

// User api
router.get('/user/:username', user.getCouponCodesByUser, errorHandler.apiErrorHandler);
router.post('/user/:username', auth.tryAuth, couponCodeGenerator.useMobileAsCode, user.createCouponForUser, errorHandler.apiErrorHandler);

// Coupons api
router.get('/', auth.tryAuth, coupon.getCouponsList, errorHandler.apiErrorHandler);
router.post('/', auth.tryAuth, couponCodeGenerator.useMobileAsCode, coupon.createCouponForUser, errorHandler.apiErrorHandler);
router.get('/:couponID', coupon.getCouponByCouponCode, errorHandler.apiErrorHandler);
router.delete('/:couponID', auth.tryAuth, coupon.deleteCouponByCouponCode, errorHandler.apiErrorHandler);
router.put('/:couponID', auth.tryAuth, coupon.updateCoupon, errorHandler.apiErrorHandler);
router.get('/:couponID/discount', coupon.getDiscountOrderValueByCouponID, errorHandler.apiErrorHandler);

// Coupons/Order api
router.get('/:couponCode/orders', auth.tryAuth, couponOrder.getOrdersByCouponCode, errorHandler.apiErrorHandler);
router.post('/:couponCode/orders', couponOrder.createNewCouponOrder, errorHandler.apiErrorHandler);
router.get('/:couponCode/orders/:orderId', auth.tryAuth, couponOrder.getOrderByOrderIdAndCouponCode, errorHandler.apiErrorHandler);
router.put('/:couponCode/orders/:orderId', auth.tryAuth, couponOrder.updateCouponOrder, errorHandler.apiErrorHandler);

auth.initPassportLocalStrategy();
router.post('/login',  passport.authenticate('local', { session : false } ),
  auth.generateAdminToken, auth.sendToken, errorHandler.apiErrorHandler);

//for test purpose
router.get('/error/api', function (req, res, next) {
  var err = new Error('This is an Error for test api errors');
  err.api = true;
  err.status = 406;
  next(err);
}, errorHandler.apiErrorHandler);

module.exports = router;