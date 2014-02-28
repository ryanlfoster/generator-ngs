'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NgsGenerator = module.exports = function NgsGenerator(args, options, config) {
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
  },
  {
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

NgsGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/sass');
  this.mkdir('src/coffee');
  this.mkdir('templates');
  this.mkdir('js');
  this.mkdir('css');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

NgsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');

  this.directory('grunt', 'grunt');
};

NgsGenerator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.coffee');
};
