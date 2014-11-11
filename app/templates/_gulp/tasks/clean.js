var gulp = require('gulp'),
    chalk = require('chalk'),
    del = require('del');

// Clean up the output folders
gulp.task('clean', function () {
    return del([ 'js/*.js', 'css/*.css'], function(err) {
        if (!!err) { return console.log( chalk.red(err) ); }

        return console.log( chalk.green('Files deleted') );
    });
});
