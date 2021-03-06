/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('ngs generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('ngs:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            '.csslintrc'
        ];

        helpers.mockPrompt(this.app, {
            'projectName': 'Tests',
            'builder': 'Gulp',
            'useBackbone': 'Y',
            'useRequire': 'Y',
            'cssPre': 'Y',
            'autoPre': 'Y',
            'jsPre': 'Y'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
