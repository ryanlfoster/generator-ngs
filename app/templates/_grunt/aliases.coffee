module.exports =
# Prepending any tasks with newer: will only process changed files
# More info: https://github.com/tschaub/grunt-newer
    default:
        'clean'
        'newer:coffeelint'
        'newer:coffee:compile'
        'newer:compass:build'
        'uglify'
        'clean'
