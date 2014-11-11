var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('prefix', function() {
    gulp.src('./css/*.css')
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(gulp.dest('./css'));
});
