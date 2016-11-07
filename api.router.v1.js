/**
 * Created by ekinr on 2016/11/3.
 *
 * Routers for API paths
 */
var express = require('express');
var info = require('./api/v1/info');
var user = require('./api/v1/coupons.user');
var coupon = require('./api/v1/coupons');

var router = express.Router();

router.get('/info', info);
router.get('/user/:username', user.getCouponCodesByUser);
router.get('/', coupon.getCouponsList);
router.get('/:couponID', coupon.getCouponCodesByCouponID);


module.exports = router;