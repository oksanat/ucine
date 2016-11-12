module.exports = function(grunt) {
    grunt.initConfig({
        // Task configurations
        jasmine_node: {
            options: {
                forceExit: true,
                match: ".",
                specNameMatcher: "spec",
            },
            all: ["spec/backend/"]
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "spec/**/*.js"]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-jasmine-node");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask("default", ["jasmine_node", "jshint"]);
    grunt.registerTask("test", ["jasmine_node", "karma"]);
};
