// Dependencies
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send(
    {
      version: "V1",
      description: 'Daoyuan Edu Coupon Service.',
      author: "fang"
    });
});

module.exports = router;
