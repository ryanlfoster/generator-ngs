module.exports =
    # so we can compile the files into
    # something readable on the interwebs.
    compile:
        files: [
            expand: true
            cwd: './'
            src: ['coffee/{,*/}*.coffee', '!Gruntfile.coffee']
            dest: 'js'
            # we need this rename function in case files are named
            # with dot notation. e.g., ngm.module.coffee
            rename: (destBase, destPath) ->
                destBase + destPath.replace(/\.coffee$/, '.js')
        ]
