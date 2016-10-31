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

        GeoLocationService.getCurrentPosition()
            .then(function(position) {
                console.log(position);
                MapService.refresh(position);
            });
    }

})(window.angular);
