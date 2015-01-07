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
    },
    // {
    //     type: 'list',
    //     name: 'builder',
    //     message: 'How would you like to run your tasks?',
    //     choices: ['Grunt', 'Gulp']
    // },
    {
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
        // removing Gulp option for now
        // this.builder = props.builder.toLowerCase();
        this.builder = 'grunt';
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
    this.copy('_coffeelint.json', 'coffeelint.json');
    // We're copying over all the default tasks for the selected task runner
    this.directory('_' + this.builder, this.builder);
};

NgsGenerator.prototype.gruntCleanup = function gruntCleanup() {
    // We're going to cleanup any tasks not needed
    var cb = this.async(),
        format = this.builder === 'grunt' ? '.coffee' : '.js';

    if (this.builder === 'gulp') {
        this.builder = this.builder.concat('/tasks');
    }

    if (!this.cssPre) {
        // this.copy('_grunt/compass.coffee', 'grunt/compass.coffee');
        rimraf(this.builder + '/compass' + format, function () {
            console.log('Removing Compass task');
        });
    }

    if (!this.autoPre && (this.builder === 'grunt')) {
        // this.copy('_grunt/compass.coffee', 'grunt/compass.coffee');
        rimraf(this.builder + '/autoprefixer' + format, function () {
            console.log('Removing Autoprefixer task');
        });
    }

    if (!this.jsPre) {
        if (this.builder === 'grunt') {
            rimraf(this.builder + '/coffeelint' + format, function () {
                console.log('Removing Coffeelint task');
            });
        } else {
            rimraf(this.builder + '/lint' + format, function () {
                console.log('Removing lint task');
            });
        }

        rimraf(this.builder + '/coffee' + format, function () {
            console.log('Removing Coffee task');

        });
    }

    if (!this.jsPre && !this.cssPre) {
        rimraf(this.builder + '/watch' + format, function () {
            console.log('Removing Watch task');
        });
    }
    cb();
};

NgsGenerator.prototype.tests = function git() {
    // simply copy the test dir and config file for karma
    this.directory('_spec', 'spec');
    this.copy('karma.conf.js');
};

NgsGenerator.prototype.taskRunner = function gruntfile() {
    // Finish off by just moving the task runner main file
    this.copy((this.builder === 'grunt') ? 'Gruntfile.coffee' : 'gulpfile.js');
};
