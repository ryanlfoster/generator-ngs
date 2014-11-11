var gulp = require('gulp'),
    coffeelint = require('gulp-coffeelint'),
    jshint = require('gulp-jshint');

// Linting is good
gulp.task('jslint', function() {
    return gulp.src('*.js')
        // need to set this from .jshintrc
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('coffeelint', function() {
    return gulp.src('./src/*.coffee')
        .pipe(coffeelint('./coffeelint.json'))
        .pipe(coffeelint.reporter());
});

gulp.task('lint', ['jslint', 'coffeelint']);
