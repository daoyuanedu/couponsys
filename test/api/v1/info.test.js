/**
 * Created by ekinr on 2016/10/31.
 *
 */
var app = require('../../../app');
var request = require('supertest')(app);
var path = '/api/v1/coupons/info';

describe('/api/v1/coupons/info', function () {
  describe('GET', function () {
    it('should return 200', function (done) {
      request.get(path)
        .expect(200, done);
    });
    it('should return the right version number', function (done) {
      request.get(path)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.version.toUpperCase().should.include('V1');
        })
        .end(done);
    });
    it('should have a description.', function (done) {
      request.get(path)
        .expect(function (res) {
          res.body.hasOwnProperty('description').should.equal(true);
        })
        .end(done);
    });

    it.skip('skip this test, and marked as pending', function () {
    });
  });
});