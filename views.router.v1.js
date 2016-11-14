// Dependencies
var express = require('express');
var index = require('./views/v1/index');
var views = require('./views/v1/component');

// Router
var router = express.Router();

// Index
router.get('/info', function(req, res) {
    res.render('pages/info');
});
// Coupons api
router.get('/', function(req, res) {
    res.render('pages/index');
});
module.exports = router;