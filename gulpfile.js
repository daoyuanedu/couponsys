/**
 * Created by ekinr on 2016/10/29.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

var exec = require('child_process').exec;
var config = require('./config.default');

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

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
}

var dbPath = config.dbPath;
gulp.task('start-mongo', runCommand('mongod --dbpath ' + dbPath));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));