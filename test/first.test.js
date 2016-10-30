/**
 * Created by ekinr on 2016/10/29.
 */
var should = require('should');

describe('my first test', function() {
    it('works', function() {
        (5).should.be.exactly(5).and.be.a.Number;
    });
});

describe('This project', function() {
    it('should be a big success', function () {
        ('Success').should.eql('Success');
    });
});