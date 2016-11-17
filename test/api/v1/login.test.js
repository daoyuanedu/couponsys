/**
 * Created by ekinr on 2016/11/17.
 */

var app = require('../../../app');
var request = require('supertest')(app);
var User = require('../../../models').User;
var config = require('../../../config.default');
var mockUsers = require('../../common/mockUsers');
var path = '/api/v1/coupons/login';

var should = require('chai').Should();

describe('/api/v1/coupons/login', function () {

  var testAdmin1 = mockUsers.testAdmin1;

  before(function (done) {
    config.debug.should.equal(true);
    config.db.should.equal('mongodb://127.0.0.1/daoyuanedu_dev');
    User.remove({}).then(function () {
      new User(testAdmin1).save(done);
    }).catch(done);
  });

  it('should login the user with right password and send back token', function (done) {
    request.post(path)
      .send({username : testAdmin1.username, password : testAdmin1.password})
      .expect(function (res) {
        (res.body.success).should.equal(true);
        (res.body.token).should.be.a('string');
      })
      .end(done);
  });

  it('should not login a user with wrong password', function (done) {
    request.post(path)
      .send({username : testAdmin1.username, password : 'fake'})
      .expect(401, done);
  });


});