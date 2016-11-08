var config = {
    dev: {
        env: "dev",
        port: 8080,
        mongodb: {
            host: "127.0.0.1",
            port: 27017
        },
        maps: {
            apiKey: "AIzaSyC-UEOxfXC1vjgxXrxM63Mvmi2ZW97801k",
            provider: "google",
            httpAdapter: "https",
            formatter: null
        }
    }
}
module.exports = function(mode) {
    return config[mode || 'dev'] || config.dev;
}
