(function(angular) {
  "use strict";

  angular
    .module("App", ["MapController", "MenuController", "ToolbarController", "MapService", "MovieService", "GeoLocationService", "ngMaterial"])
    .config(config)
    .run(run)

    function config($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme("ucine")
            .primaryPalette("blue");
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
    }

})(window.angular);
