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

    function SideController($scope, $log, $mdDialog, GeoLocationService, MovieService) {
        $scope.releaseYears = MovieService.getReleaseYears();

        $scope.findNearMe = function () {

            GeoLocationService.getCurrentPosition()
                .then(function(position) {
                    $log.debug("Obtained position", position);
                 })
                 .catch(function(error) {
                     $mdDialog.show(
                         $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#map')))
                             .clickOutsideToClose(true)
                             .title("Ooops...")
                             .textContent("Looks like location information is unavailable.")
                             .ariaLabel("Looks like location information is unavailable.")
                             .ok("Ok")
                     );

                 });

        };

        $scope.submit = function() {
            MovieService.search($scope.data);
        };
    }

})(window.angular);
