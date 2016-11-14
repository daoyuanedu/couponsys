# Couponsys
##The coupon service.

---
###Run Service
---
* Install Dependencies
  + npm install
  + npm install forever -g
* Run service
  + node ./bin/www
  or
  + forever start ./bin/www

```
Better with nodemon:
Install: npm install -g nodemon
Run: nodemon .bin/www
```
---

###  API
---

see doc/api.html

---
###Test
---
Run test:
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