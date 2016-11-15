// Dependencies
var express = require('express');
var Others = require('./views/v1/others');
var Coupons = require('./views/v1/coupons');
var Users = require('./views/v1/users');
var Orders = require('./views/v1/orders');


// Router
var router = express.Router();

// Index
router.get('/', Others.index);
// coupons
router.get('/coupons', Coupons.coupons);
// users
router.get('/users', Users.users);
// orders
router.get('/orders', Orders.orders);
// Info
router.get('/info', Others.info);




module.exports = router;