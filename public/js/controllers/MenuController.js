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

        function buildToggler(sideNavId) {
            return function() {
                $mdSidenav(sideNavId).toggle();
            }
        }
    }

    function SideController($scope, $mdSidenav, $mdDialog) {
        $scope.close = function () {
            $mdSidenav("sideNav").close();
        };
        $scope.lucky = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#map')))
                    .clickOutsideToClose(true)
                    .title("This is an alert title")
                    .textContent("You can specify some description text in here.")
                    .ariaLabel("Alert Dialog Demo")
                    .ok("Got it!")
            );
        };
    }

})(window.angular);
