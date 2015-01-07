module.exports = function(config) {
    'use strict';

    // Browsers to run on Sauce Labs
    // var customLaunchers = {
        // 'SL_Chrome': {
        //   base: 'SauceLabs',
        //   browserName: 'chrome'
        // }
        // 'SL_Firefox': {
        //   base: 'SauceLabs',
        //   browserName: 'firefox',
        //   version: '26'
        // },
        // 'SL_Safari': {
        //   base: 'SauceLabs',
        //   browserName: 'safari',
        //   platform: 'OS X 10.9',
        //   version: '7'
        // },

        // DO NOT USE IE THERE IS A BUG WITH SINON
        // see: https://github.com/cjohansen/Sinon.JS/issues/335
        // 'SL_IE_8': {
        //   base: 'SauceLabs',
        //   browserName: 'internet explorer',
        //   platform: 'Windows 2008',
        //   version: '8'
        // },
    // };


    // process.env.SAUCE_USERNAME = 'replace with username';
    // process.env.SAUCE_ACCESS_KEY = 'replace with api key';


    config.set({


    // Build Number Prodived by Bamboo Server or assume Local
    // build: '${jenkins.buildNumber}' || 'LOCAL',

    // Title for Build appear in Sauce Labs UI
    // sauceLabs: {
    //     testName: 'replace with some name',
    //     recordVideo: true
    // },

    // Required by Karma Sauce Launcher
    // see: https://github.com/saucelabs/karma-sauce-example/blob/master/karma.conf-ci.js
    // customLaunchers: customLaunchers,

    // Start these browsers, currently available:
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: Object.keys(customLaunchers),


        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

        plugins: [
            'karma-browserify',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher'
        ],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'node_modules/js-fixtures/fixtures.js', watched: false, included: true, served: true},
            {pattern: 'fixtures/*.html', watched: true, included: false, served: true},
            {pattern: 'css/*.css', watched: false, included: false, served: true},
            {pattern: 'spec/{,*/}*.js', watched: true, included: true, served: true},
            {pattern: 'js/{,*/}*.js', watched: true, included: false, served: true}
        ],



        // list of files to exclude
        exclude: [
            '**/*.min*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec/**/*.js': [ 'browserify' ]
        },

        // TODO: create .istanbul.yml for customization

        // https://github.com/Nikku/karma-browserify
        browserify: {
            debug: true,
            transform: [ 'brfs', 'browserify-istanbul' ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'mocha', 'coverage'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        // reporter options - full, autowatch, minimal
        mochaReporter: {
            output: 'full'
        },

        // coverage reporter
        coverageReporter: {
            type : 'text'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
