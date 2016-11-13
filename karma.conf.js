module.exports = function(config) {
  config.set({

    basePath: "",
    frameworks: ["jasmine"],
    // List of files to load in the browser
    files: [
      "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js",
      "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-mocks.js",
      "./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js",
      "public/js/**/*.js",
      "spec/frontend/**/*.js"
    ],

    exclude: [
      ],
    preprocessors: {
      },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["PhantomJS", "Chrome"],
    singleRun: true,

    // How many browser should be started simultaneous
    concurrency: Infinity
  })
}
