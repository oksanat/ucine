(function(angular) {
  "use strict";

  angular
    .module("App", ["SidebarController", "MapService"])
    .run(run);

    function run(MapService) {
        MapService.Initialize();
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27)
                $rootScope.$broadcast("escapePressed", e.target);
        });
    }

})(window.angular);
