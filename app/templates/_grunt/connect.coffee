module.exports =
    demo:
        # hostname must end in nationalgeographic.com for header
        # check your hosts file and add path from below, if needed
        options:
            open: true
            keepalive: true
            hostname: 'dev.nationalgeographic.com'
            livereload: 35729
            port: 9000
            base: [
                './'
            ]
