module.exports = function(config) {
    config.set({

        basePath: __dirname + "/..",
        frameworks: ["jasmine"],
        //plugins:["karma-ng-html2js-preprocessor"],
        // List of files to load in the browser
        files: [
            "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js",
            "node_modules/angular/angular.js",
            "node_modules/angular-animate/angular-animate.js",
            "node_modules/angular-aria/angular-aria.js",
            "node_modules/angular-material/angular-material.js",
            "node_modules/angular-material/angular-material-mocks.js",
            "node_modules/angular-mocks/angular-mocks.js",
            "public/js/**/*.js",
            "spec/mocks/googleMapsApi.js",
            "spec/frontend/**/*.js",
            "public/templates/*.html"
        ],

        exclude: [],
        preprocessors: {
            // Location of templates
            "public/templates/*.html": ["ng-html2js"],
            "public/js/**/*.js": ["coverage"]
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: "public",
            // The name of the Angular module to create
            moduleName: "templates"
        },
        coverageReporter: {
            type: "html",
            dir: "coverage",
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    excludes: [ ]
                },
                each: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [ ]
                }
            },
            watermarks: {
                statements: [ 50, 75 ],
                functions: [ 50, 75 ],
                branches: [ 50, 75 ],
                lines: [ 50, 75 ]
            }
        },
        reporters: ["progress", "coverage"],
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
