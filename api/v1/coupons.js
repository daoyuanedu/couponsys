// Dependencies
var express = require('express');
var fs = require('fs')
var bodyParser = require('body-parser');

// app
var router = express.Router();

/* GET coupons listing. */
router.get('/', function(req, res, next) {
  res.send('This will list all coupons');
});

/* POST coupons test */
router.post('/', function(req, res, next) {
  var receivedData = res.end(JSON.stringify(req.body));
  console.log('I have received a coupons ID: ' + JSON.stringify(req.body));
});

module.exports = router;
