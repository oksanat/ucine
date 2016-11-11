module.exports = function(grunt) {
    grunt.initConfig({
        // Task configurations
        jasmine_node: {
            options: {
                forceExit: true,
                match: ".",
                specNameMatcher: "spec",
            },
            all: ["spec/"]
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "spec/**/*.js"]
        }
    });

    grunt.loadNpmTasks("grunt-jasmine-node");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["jasmine_node", "jshint"]);
    grunt.registerTask("tests", ["jasmine_node"]);
};
