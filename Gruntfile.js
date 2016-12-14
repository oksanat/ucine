module.exports = function(grunt) {
    grunt.initConfig({
        // Task configurations
        jasmine_node: {
            options: {
                forceExit: true,
                specNameMatcher: "spec",
            },
            all: ["spec/backend"]
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "spec/**/*.js"]
        },
        eslint: {
            options: {
                configFile: "conf/eslint.json"
            },
            target: ["src/**/*.js", "public/**/*.js", "spec/**/*.js"]
        },
        karma: {
            unit: {
                configFile: "conf/karma.conf.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-jasmine-node");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("default", ["jshint", "eslint", "jasmine_node", "karma"]);
    grunt.registerTask("lint", ["jshint", "eslint"]);
    grunt.registerTask("test", ["jasmine_node", "karma"]);
};
