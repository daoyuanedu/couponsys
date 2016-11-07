// Dependencies
var coupon = require('../../proxy/coupon.model');
var logger = require('../../common/logger');

var getCouponsList = function(req, res, next) {
  coupon.getAllCoupons().then(function (coupons) {
    res.send(coupons);
  }, function (err) {
    logger.error(err);
    err.api = true;
    err.status(406);
    next(err);
  });
};
exports.getCouponsList = getCouponsList;

var getCouponCodesByCouponID = function(req, res, next) {
  var couponID = req.params.couponID;
  coupon.getCouponCodesByCouponCode(couponID).then(function (coupons) {
    res.send(coupons);
  }, function (err) {
    logger.error(err);
    err.api = true;
    err.status(406);
    next(err);
  });
};
exports.getCouponCodesByCouponID = getCouponCodesByCouponID;


// TODO Old version, need to be replaced later
// api router
// var router = express.Router();

// // ###### Coupons Block ######
// /* GET coupons list logic */
// router.get('/', function(req, res, next) {
//   res.render('coupon', { couponPage: 'Coupon' });
//   console.log('Get list of all coupons');
// });

// /* GET one coupon logic */
// router.get('/:couponID', function(req, res, next) {
//   var couponId = req.params.couponID;
//   console.log('Searching for one coupon by using couponID: ' + req.params);

//   // Use this path to get one coupons: /api/v1/coupons/123
//   // This can be used to send conpon json data back
//   if (req.params.couponID == 123) {
//   	res.send('Found Id: ' + couponId);
//   	console.log('Find ID: ' + couponId);
//   } else {
//   	res.send('Not Found Id: ' + couponId )
//   	console.log('Not Found ID ' + couponId);
//   }
// });

// /* POST one coupon logic */
// router.post('/', function(req, res, next) {
//   var receivedData = JSON.stringify(req.body);
//   console.log('I have received a coupons data: ' + JSON.stringify(req.body));
//   res.send(req.body);
// });

// // ###### Order Block ######
// /* GET orders list logic */
// // Input couponID to get list of orders
// router.get('/:couponID/orders', function(req, res, next) {
//   var couponId = req.params.couponID;
//   console.log('Searching for order lists in one coupon by using couponID: ' + couponId);

//   // Use this path to get one coupons: /api/v1/coupons/123
//   // This can be used to send conpon json data back
//   if (couponId == 123) {
//     res.render('order', { orderPage: 'Order', couponBelong: couponId.toString()});
//   	console.log('Find orders list by couponID: ' + couponId);
//   } else {
//   	res.send('Not Found couponId: '+ couponId + ', can not list orders here');
//   	console.log('Not Found ID: ' + couponId);
//   }
// });

// /* GET one order logic */
// // Input couponID and orderID to get list of orders
// router.get('/:couponID/orders/:orderID', function(req, res, next) {
//   var couponId = req.params.couponID;
//   var orderId = req.params.orderID;
//   console.log('Searching for order ID:' + orderId + ' in one coupon by using couponID: ' + couponId);

//   // Use this path to get one coupon: /api/v1/coupons/123/orders/321
//   // This can be used to send order json data back
//   if (couponId == 123) {
//   	console.log('Find couponID: \'' + couponId + '\' start searching order ID: ' + orderId);

//     // If couponID match, search orderID
//   	if (orderId == 321) {
//   	   console.log('Found order ID: ' + orderId);
//        res.send('Found order ID: \'' + orderId + '\' in couponID: ' + couponId);
//   	} else {
//   	   console.log('Not Found order ID: ' + orderId);
//        res.send('Not Found order ID: \'' + orderId + '\' in couponID: ' + couponId);
//   	}

//   } else {
//   	res.send('Not Found couponId: '+ couponId + ', can not find orderID: \'' + orderId + '\' here.');
//   	console.log('Not Found couponId ID: ' + couponId);
//   }
// });

// module.exports = router;
