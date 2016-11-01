(function(angular) {
  "use strict";

  angular
    .module("App", ["MenuController", "ToolbarController", "MapService", "GeoLocationService", "ngMaterial"])
    .config(config)
    .run(run);

    function config($mdThemingProvider) {
        $mdThemingProvider.theme("ucine")
            .primaryPalette("blue");
    }

    function run(MapService, GeoLocationService) {

        var position = {
            coords: {
                latitude: 37.773972,
                longitude: -122.431297
            }
        };
        GeoLocationService.getCurrentPosition()
            .then(function(position) {
                console.debug("Obtained position", position);
            })
            .catch(function(error) {
                console.info("Failed to obtain current position, using default");
            })
            .finally(function() {
                MapService.refresh(position);
            });
    }

})(window.angular);
