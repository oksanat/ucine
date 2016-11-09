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
        },
        boundaries: {
            ne: {
                lat: 37.6040,
                lng: -123.0137
            },
            sw: {
                lat: 37.8324,
                lng: -122.3549
            }
        }
    }
}
module.exports = function(mode) {
    return config[mode || 'dev'] || config.dev;
}
