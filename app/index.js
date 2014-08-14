'use strict';

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    rimraf = require('rimraf');

var NgsGenerator = module.exports = function NgsGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NgsGenerator, yeoman.generators.Base);

NgsGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'projectName',
        message: 'What do you want to call your project?'
    }, {
        type: 'confirm',
        name: 'useBackbone',
        message: 'Would you like to include Backbone.js?',
        default: true
    }, {
        type: 'confirm',
        name: 'useRequire',
        message: 'Would you like to include RequireJS (for AMD support)?',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;

        this.useBackbone = props.useBackbone;
        this.useRequire = props.useRequire;

        cb();
    }.bind(this));
};

NgsGenerator.prototype.askForPreprocessors = function askForPreprocessors() {
    var cb = this.async();
    var prompts = [{
        name: 'cssPre',
        type: 'list',
        message: 'Will you be using a CSS preprocessor?',
        choices: ['None', 'Compass']
    }, {
        name: 'autoPre',
        type: 'confirm',
        message: 'Use the Autoprefixer for your CSS?'
    }, {
        name: 'jsPre',
        type: 'list',
        message: 'How about a Javascript preprocessor? We like Coffeescript.',
        choices: ['None', 'Coffeescript']
    }];

    this.prompt(prompts, function (props) {
        this.cssPre  = props.cssPre === 'None' ? false : props.cssPre.toLowerCase();
        this.autoPre = props.autoPre;
        this.jsPre   = props.jsPre === 'None' ? false : props.jsPre.toLowerCase();

        cb();
    }.bind(this));
};

// Begin Generating App/UI
NgsGenerator.prototype.app = function app() {
    this.mkdir('templates');
    this.mkdir('js');
    this.mkdir('css');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
};

NgsGenerator.prototype.preprocessors = function preprocessors() {
    if (this.cssPre) { this.mkdir('scss'); }
    if (this.jsPre) { this.mkdir('coffee'); }
};

NgsGenerator.prototype.git = function git() {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

// adding opinionated project settings
NgsGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('csslintrc', '.csslintrc');
    this.copy('bowerrc', '.bowerrc');
    // We're copying over all the default tasks used by load-grunt-config
    this.directory('_grunt', 'grunt');
};

NgsGenerator.prototype.gruntCleanup = function gruntCleanup() {
    // We're going to cleanup any tasks not needed
    var cb = this.async();

    if (!this.cssPre) {
        // this.copy('_grunt/compass.coffee', 'grunt/compass.coffee');
        rimraf('grunt/compass.coffee', function () {
            console.log('Removing Compass task');
        });
    }

    if (!this.autoPre) {
        // this.copy('_grunt/compass.coffee', 'grunt/compass.coffee');
        rimraf('grunt/autoprefixer.coffee', function () {
            console.log('Removing Autoprefixer task');
        });
    }

    if (!this.jsPre) {
        rimraf('grunt/coffeelint.coffee', function () {
            console.log('Removing Coffeelint task');
        });

        rimraf('grunt/coffee.coffee', function () {
            console.log('Removing Coffee task');

        });
    }

    if (!this.jsPre && !this.cssPre) {
        rimraf('grunt/watch.coffee', function () {
            console.log('Removing Watch task');
        });
    }
    cb();
};

NgsGenerator.prototype.gruntfile = function gruntfile() {
    // Finish off by just moving the Grunt file over
    this.copy('Gruntfile.coffee');
};
