// Dependencies
var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.render('order', { orderPage: 'Order' });
});

module.exports = router;
