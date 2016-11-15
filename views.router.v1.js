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
router.get('/coupons', Coupons.coupons);
// users
router.get('/users', Users.users);
// orders
router.get('/orders', Orders.orders);
// Info
router.get('/info', Others.info);



module.exports = router;