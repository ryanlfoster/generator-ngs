module.exports =
    # basic watch tasks first for development
    <% if (jsPre == "coffeescript") { %>
    coffee:
        files: [
            '*.coffee'
        ]
        tasks: 'coffee:compile'
        options:
            livereload: true
    <% } %><% if (cssPre == "compass") { %>
    compass:
        files: ['*.{scss,sass}']
        tasks: ['compass:server']
    <% } %>
