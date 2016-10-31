(function(angular) {
  "use strict";

  angular
    .module("App", ["MenuController", "ToolbarController", "MapService", "ngMaterial"])
    .config(config)
    .run(run);

    function config($mdThemingProvider) {
        $mdThemingProvider.theme("ucine")
            .primaryPalette("blue");
    }

    function run(MapService) {
        MapService.Initialize();
    }

})(window.angular);
