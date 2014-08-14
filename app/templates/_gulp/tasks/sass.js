var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    gutil = require('gulp-util');

gulp.task('sass', function () {
  return gulp.src('src/sass/*.{sass, scss}')
    .pipe(sass({
      compass: true,
      bundleExec: true,
      sourcemap: true,
      sourcemapPath: '../sass'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./css'));
});
