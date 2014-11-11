// Watch the files
gulp.task('watch', function() {
  gulp.watch( 'js/*.js', ['lint', 'minify']);
});
