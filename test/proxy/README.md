## PROXY TEST CASE SUMMARY
Find any new test cases can add here first and then implement it.
---

#### Coupon Proxy Test
---
```
Done & PASS
```
* isCouponValid should return true when coupon is valid
* isCouponValid should return false when coupon is not valid
* isCouponValid should return false when coupon does not exist
* getDiscountedValue should return -20% value when use percentage rule
* getDiscountedValue should return -200 value when use percentage rule
* isBelongToUsers should return true if the user have this coupon
* isBelongToUsers should return false if the user do not have this coupon
* deleteCouponCodesByCouponCode should delete one coupon by couponCode
* deleteCouponCodesByCouponCode should not delete coupons by wrong couponCode
```
New & TODO
```
*
*

#### CouponOrder Proxy Test
---
```
Done & PASS
```
* totalOrdersByCouponCode should return the number of orders if a coupon code is valid
* totalOrdersByCouponCode should return 0 if no orders does not exit
```
New & TODO
```
*
*