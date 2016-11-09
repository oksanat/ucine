(function(angular) {
  "use strict";

    // Default environment variables
    var __env = {};
    if (window) {
        Object.assign(__env, window.__env);
    }

    angular
        .module("App", ["MapController", "MenuController", "ToolbarController", "MapService", "MovieService", "GeoLocationService", "ngMaterial"])
        .config(config)
        .run(run)
        .constant('__env', __env);

    function config($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme("ucine")
            .primaryPalette("blue");
        $mdThemingProvider.setDefaultTheme("ucine");
        // Enable http caching
        $httpProvider.defaults.cache = true;
        $httpProvider.defaults.headers.get = {
            "Accept": "application/json"
        };
    }

    function run() {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
        angular.isNullOrUndefined = function(value) {
            return angular.isUndefined(value) || value === null;
        };
        angular.isEmpty = function (obj) {
            for (var i in obj) if (obj.hasOwnProperty(i)) return false;
            return true;
        };
    }

})(window.angular);
