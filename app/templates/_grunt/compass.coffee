module.exports =
    options:
        require: ['sass-globbing', 'breakpoint']
        cssDir: 'css'
        sassDir: 'scss'
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
