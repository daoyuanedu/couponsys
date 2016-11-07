var app = require('../../app');
var request = require('supertest')(app);

describe('Error handler', function () {
  it('should return 404 and the error page when a page not found error happens', function (done) {
    request.get('/api/v1/error')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, done);
  });

  it('should return error code and json when an api error happens', function (done) {
    request.get('/api/v1/coupons/error/api')
      .expect('Content-Type', /json/)
      .expect(406, done);
  });
});