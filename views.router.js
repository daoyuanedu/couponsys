// Dependencies
var express = require('express');
var Others = require('./controller/v1/others');
var Coupons = require('./controller/v1/coupons');
var Users = require('./controller/v1/users');
var Orders = require('./controller/v1/orders');

// Router
var router = express.Router();

// Index
router.get('/', Others.index);
// coupons
router.get('/coupons', Coupons.getCouponsList);
router.get('/coupons/:couponID', Coupons.getCouponByCouponCode);
// users
router.get('/users', Users.userPage);
// orders
router.get('/orders', Orders.getOrders);
router.get('/orders/:orderID', Orders.getOrdersByOrderID);

// Info
router.get('/info', Others.info);
// Login
router.get('/login', Others.login);


module.exports = router;