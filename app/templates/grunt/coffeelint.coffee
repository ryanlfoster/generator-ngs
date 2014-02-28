module.exports =
    # lint our files to make sure we're keeping to team standards
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
