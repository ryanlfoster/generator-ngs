var gulp = require('gulp'),
    gutil = require('gulp-util'),
    p = require('./package.json'),
    del = require('del'),
    coffeelint = require('gulp-coffeelint'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglifyjs'),
    jshint = require('gulp-jshint'),
    chalk = require('chalk'),
    date = new Date(),
    banner = '/**\n' +
        ' * NGS Project: ' + p.name + ' - v' + p.version + '\n' +
        ' * Description: ' + p.description + '\n' +
        ' * Date Built: ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + '\n' +
        ' * Copyright (c) ' + date.getFullYear() +
        '  | ' + p.author.name + '\n' +
        '**/\n',
    jsPath = 'js/*.js';

// Clean up the output folders
gulp.task('clean', function () {
    return del([ jsPath, 'css/*.css'], function(err) {
        if (!!err) { return console.log( chalk.red(err) ); }

        return console.log( chalk.green('Files deleted') );
    });
});

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

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
});

// Minify and add banner to script
gulp.task('minify', function() {
    gulp.src( jsPath )
        .pipe(uglify( p.name + '.min.js', {
            output: {
                preamble: banner
            }
        }))
        .pipe(gulp.dest('./'));
});

// Watch the files
gulp.task('watch', function() {
  gulp.watch( jsPath, ['lint', 'minify']);
});

gulp.task('lint', ['jslint', 'coffeelint']);
gulp.task('default', ['clean', 'lint', 'minify']);
