'use strict'
module.exports = (grunt) ->
    # load all grunt tasks
    # this assumes matchdep, grunt-contrib-watch, grunt-contrib-coffee,
    # grunt-coffeelint, grunt-contrib-clean, grunt-contrib-uglify is in the package.json file
    require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

    grunt.initConfig
        # load in the module information
        pkg: grunt.file.readJSON 'package.json'
        # path to Grunt file for exclusion
        gruntfile: 'Gruntfile.coffee'
        # generalize the module information for banner output
        banner: '/**\n' +
                        ' * NGS Project: <%= pkg.name %> - v<%= pkg.version %>\n' +
                        ' * Description: <%= pkg.description %>\n' +
                        ' * Date Built: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %>' +
                        '  | <%= pkg.author.name %>;\n' +
                        '**/\n'

        # basic watch tasks first for development
        watch:
            coffee:
                files: [
                    '*.coffee'
                ]
                tasks: 'coffee:compile'
                options:
                    livereload: true
            compass:
                files: ['*.{scss,sass}']
                tasks: ['compass:server']


        # clear out any unneccessary files
        clean: ['<%= pkg.name %>.js', '!.node_modules/']


        # lint our files to make sure we're keeping to team standards
        coffeelint:
            files:
                src: ['<%= pkg.name %>.coffee']
            options:
                'indentation':
                    value: 4
                    level: 'warn'
                'no_trailing_whitespace':
                    level: 'ignore'
                'max_line_length':
                    velue: 120
                    level: 'warn'


        # this is here, well so we can compile the files into something
        # readable on the interwebs.
        coffee:
            compile:
                files: [
                    expand: true
                    cwd: ''
                    src: ['<%= pkg.name %>.coffee']
                    dest: ''
                    # we need this rename function in case files are named
                    # with dot notation. e.g., ngm.module.coffee
                    rename: (destBase, destPath) ->
                        destBase + destPath.replace(/\.coffee$/, '.js')
                ]

        compass:
            options:
                require: ['sass-globbing', 'breakpoint']
                cssDir: 'css'
                sassDir: 'src/sass'
                relativeAssets: true
                force: true
                bundleExec: true
            ,
            build:
                options:
                    environment: 'production'
            ,
            server:
                options:
                    debugInfo: true

        jshint:
            options:
                curly: true
                eqeqeq: true
                eqnull: true
                expr: true
                latedef: true
                onevar: true
                noarg: true
                node: true
                trailing: true
                undef: true
                unused: true
            all: [ '*.js' ]

        # clean up, minify and prepare for production use
        uglify:
            options:
                banner: '<%= banner %>'
            build:
                files:
                    '<%= pkg.name %>.min.js': '<%= pkg.name %>.js'

        ## TODO: we need to add tests to start in all modules
        # prefered to start with Jasmine


    grunt.registerTask 'default', [
        'clean'
        'coffeelint'
        'coffee:compile'
        'compass:build'
        'uglify'
        'clean'
    ]
