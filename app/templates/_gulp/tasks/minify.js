var gulp = require('gulp'),
    p = require('./package.json'),
    date = new Date(),
    banner = '/**\n' +
        ' * NGS Project: ' + p.name + ' - v' + p.version + '\n' +
        ' * Description: ' + p.description + '\n' +
        ' * Date Built: ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + '\n' +
        ' * Copyright (c) ' + date.getFullYear() +
        '  | ' + p.author.name + '\n' +
        '**/\n',
    uglify = require('gulp-uglifyjs');

// Minify and add banner to script
gulp.task('minify', function() {
    gulp.src( 'js/*.js' )
        .pipe(uglifyjs( p.name + '.min.js', {
            output: {
                preamble: banner
            }
        }))
        .pipe(gulp.dest('./'));
});
