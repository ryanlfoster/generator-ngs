module.exports =
    serve:
        options:
            host: "video.dev.nationalgeographic.com"
            open: "external"
            port: 9000
            server:
                baseDir: "./"
            watchTask: true
        bsFiles:
            src: [
                "./index.html"
                "./examples/*.html"
                "./build/*.js"
            ]
