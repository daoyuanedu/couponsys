// Dependencies
var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.send('This will list all orders');
});

module.exports = router;
