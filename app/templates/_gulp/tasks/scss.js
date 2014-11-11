var gulp = require('gulp'),
    path = require('path'),
    chalk = require('chalk'),
    compass = require('gulp-compass');

gulp.task('scss', function() {
  gulp.src('./src/*.scss')
    .pipe(compass({
        project: path.join(__dirname, 'css'),
        css: 'stylesheets',
        sass: 'sass',
        require: ['sass-globbing', 'breakpoint']
    }))
     .on('error', function(err) {
    // Would like to catch the error here
        console.log( chalk.red(err) );
    })
    .pipe(gulp.dest('./css/'));
});
