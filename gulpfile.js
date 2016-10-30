/**
 * Created by ekinr on 2016/10/29.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function() {
    return gulp.src(['./test/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('test', function() {
    gulp.
    src(['./test/*.js'], {read: false}).
    pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch('./*.js', ['test']);
});
