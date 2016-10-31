var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Render Page use template in ./views/index
  res.render('index', { title: 'Coupons' });
});

module.exports = router;
