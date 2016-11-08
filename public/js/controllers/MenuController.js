(function () {
    "use strict";

    angular
        .module("MenuController", ["ngMaterial", "MapService", "GeoLocationService"])
        .controller("MenuController", Controller)
        .controller("SideController", SideController);

    function Controller($scope, $timeout, $mdSidenav) {
        var sideNavId = "sideNav";
        $scope.toggleSidenav = buildToggler(sideNavId);

        $scope.isOpen = function() {
            return $mdSidenav("sideNav").isOpen();
        };

        $scope.close = function () {
            $mdSidenav("sideNav").close();
        };

        function buildToggler(sideNavId) {
            return function() {
                $mdSidenav(sideNavId).toggle();
            }
        }
    }

    function SideController($scope, $mdSidenav, $mdDialog, GeoLocationService) {
        $scope.findNearMe = function () {

            GeoLocationService.getCurrentPosition()
                .then(function(position) {
                    console.debug("Obtained position", position);
                 })
                 .catch(function(error) {
                    console.info("Failed to obtain current position, using default");
                     $mdDialog.show(
                         $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#map')))
                             .clickOutsideToClose(true)
                             .title("Ooops...")
                             .textContent("Location information is unavailable.")
                             .ariaLabel("Location information is unavailable.")
                             .ok("Ok")
                     );

                 });

        };
    }

})(window.angular);
