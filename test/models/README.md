## TEST CASE SUMMARY
Find any new test cases can add here first and then implement it.
---

#### Coupon Test
---
```
Done & PASS
```
* should be able to save a coupon to the db
* should be able to read an exiting coupon from the db
* should be able to find all the coupons under a username
* should be able to only allow permitted rule type
* should not be able to save the same coupon code for a different user
* should not be able to save a non-couponId coupon to the db
* should not be able to save a non-username coupon to the db

```
New & TODO
```
*
*

#### CouponOrder Test
---
```
Done & PASS
```
* should be able to save a couponOrder to the db
* should be able to find all the couponOrders under a couponId
* should be able to read an exiting couponOrder from the db
* should be able to save conponOrders with same couponID
* should be able to save conponOrders with null orderName
* should not be able to save a non-orderId couponOrder to the db
* should not be able to save a non-couponID couponOrder to the db
* should not be able to save a non-rebated couponOrder to the db
* should not be able to save a non-original-orderValue couponOrder to the db
* should not be able to save a non-final-orderValue couponOrder to the db
* should not be able to save conponOrders with same orderID

```
New & TODO
```
*
*