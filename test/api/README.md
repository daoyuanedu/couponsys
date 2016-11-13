## PROXY TEST CASE SUMMARY
Find any new test cases can add here first and then implement it.
---

#### Coupon API Test
---
```
Done & PASS
```
##### GET
* should list and return all coupons
* should return one coupon codes by couponID
* should return a 20% discounted order value for userB by userA couponID
* should return a -200 order value for userA by userB couponID
* should not return a discounted order value for userA by userA couponID
* should not return a discounted order value for userA by invalid couponID
##### POST
* should create a coupon for a new user and return 201
* should not create a new coupon if invalid mobile has been provided
* should not create a new coupon if no mobile has been provided
#### DELETE
* should delete one coupon codes by couponID
* should not delete coupons codes by wrong couponID
#### PUT
* should update all details except couponCode of this coupon
* should update couponRule properties details except couponCode and no changed properties of this coupon
* should update random properties details except couponCode and no changed properties of this coupon
* should return 404 if coupon does not exist
```
New & TODO
```
*
*

#### CouponOrder API Test
---
```
Done & PASS
```
##### GET
* should return all the orders used this particular coupon code
* should only return non-rebated orders if rebated is set to false in the query param
##### POST
* should create a new order with this coupon code
* should return an 403 Forbidden error if coupon code is not valid
* should return an 406 error if order with the same order id already exists
##### GET /{order}
* should get the details of this order
* should return 404 if order does not exit under this coupon code
##### PUT /{order}
* should update the details of this order
* should return 404 if order does not exist
* should return 200 if nothing to update
```
New & TODO
```
* should return 403 if request is not admin auth
*

#### Coupon User API Test
---
```
Done & PASS
```
##### GET
* should return all the coupon codes for a specific user
* should return total number of orders when showTotalOrderNumber is true
##### POST
* should create a new coupon for the user and return 201
* should not create a new coupon if mobile number is invalid
* should not create a new coupon if no mobile has been provided
* should have the default coupon rule if not authorised
```
New & TODO
```
* should have the same coupon rule set by the authorised admin
*