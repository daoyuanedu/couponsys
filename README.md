# Couponsys
##The coupon service.

---
###Run Service

* Install Dependencies
  + npm install
* Run service
  + node ./bin/www
* Current Views:
  + api/v1/
  + api/v1/coupons

```
Better with nodemon:
Install: npm install -g nodemon
Run: nodemon .bin/www
```

### Working API
###### Hard code now 
###### The example API will reture true, wrong input id will return 'NOT FOUND ID' message
---
* /coupons/
  - GET POST
  - http://localhost:3000/api/v1/coupons/
* /coupons/{couponCode}
  - GET
  - http://localhost:3000/api/v1/coupons/123/
* /coupons/{couponCode}/orders
  - GET
  - http://localhost:3000/api/v1/coupons/123/orders/
* /coupons/{couponCode}/orders/{orderId}
  - GET
  - http://localhost:3000/api/v1/coupons/123/orders/321/
  
---
###Test

Run test:

=======

**Make sure config.db is set to test or dev, otherwise production db could be cleared!!!**

Run test:

Start your MongoDB first, otherwise test would fail.

```
gulp test
```

Setup test watch task:

```
gulp test-watch
```