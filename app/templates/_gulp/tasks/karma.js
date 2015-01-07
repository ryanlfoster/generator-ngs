'use strict';

var gulp = require('gulp'),
    chalk = require('chalk'),
    karma = require('karma').server;

// Clean up the output folders
gulp.task('karma', function () {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        files: ['spec/**/*.js']
    }, console.log(chalk.green('Tests Completed')) );
});
