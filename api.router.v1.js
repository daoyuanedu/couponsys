/**
 * Created by ekinr on 2016/11/3.
 *
 * Routers for API paths
 */
var express = require('express');
var info = require('./api/v1/info');
var user = require('./api/v1/coupons.user');
var coupon = require('./api/v1/coupons');
var auth = require('./middlewares/auth');
var couponCodeGenerator = require('./middlewares/couponCodeGenerator');

var router = express.Router();

// Others
router.get('/info', info);
// User api
router.get('/user/:username', user.getCouponCodesByUser);
router.post('/user/:username', auth.tryAuth, couponCodeGenerator.useMobileAsCode, user.createCouponForUser);
// Coupons api
router.get('/', coupon.getCouponsList);
router.get('/:couponID', auth.tryAuth, coupon.getCouponCodesByCouponID);
router.get('/:couponID/discount', couponCodeGenerator.discountOrder, coupon.getDiscountOrderValueByCouponID);
router.post('/', couponCodeGenerator.useMobileAndUsernameToCreateCouponCode, coupon.createCouponForNewUser);



//for test purpose
router.get('/error/api', function (req, res, next) {
  var err = new Error('This is an Error for test api errors');
  err.api = true;
  err.status = 406;
  next(err);
});


module.exports = router;