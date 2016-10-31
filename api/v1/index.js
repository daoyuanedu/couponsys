var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(
    {
      version: "V1",
      description: 'Daoyuan Edu Coupon Service.'
    });
});

module.exports = router;
