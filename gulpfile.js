/**
 * Created by ekinr on 2016/10/29.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');


gulp.task('test', function () {
  gulp.src(['./test/**/*.test.js'], {read: false}).pipe(mocha({
    reporter: 'list',
    globals: {
      should: require('chai').should(),
      expect: require('chai').expect()
    }
  })).on('error', gutil.log);
});

gulp.task('test-watch', function () {
  gulp.watch('./**/*.js', ['test']);
});
