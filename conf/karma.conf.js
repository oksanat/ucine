module.exports = function(config) {
    config.set({

        basePath: "../",
        frameworks: ["jasmine"],
        //plugins:["karma-ng-html2js-preprocessor"],
        // List of files to load in the browser
        files: [
            "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js",
            "http://maps.googleapis.com/maps/api/js?sensor=false&language=en",
            "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js",
            "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-mocks.js",
            "public/js/**/*.js",
            "spec/mocks/googleMapsApi.js",
            "spec/frontend/**/*.js",
            "public/templates/*.html"
        ],

        exclude: [],
        preprocessors: {
            // Location of templates
            "public/templates/*.html": ["ng-html2js"]
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: "public",
            // The name of the Angular module to create
            moduleName: "templates"
        },
        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["Chrome"],
        singleRun: true,

        // How many browser should be started simultaneous
        concurrency: Infinity
    })
}
