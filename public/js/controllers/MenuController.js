(function () {
    "use strict";

    angular
        .module("MenuController", ["MapService", "AddressService", "ngMaterial"])
        .controller("MenuController", Controller)
        .controller("SideController", SideController);

    function Controller($scope, $mdSidenav) {
        var sideNavId = "sideNav";
        $scope.toggleSidenav = buildToggler(sideNavId);

        $scope.isOpen = function() {
            return $mdSidenav("sideNav").isOpen();
        };

        $scope.close = function () {
            $mdSidenav("sideNav").close();
        };

        $scope.$on("closeSideNav", function() {
            $scope.close();
        });

        function buildToggler(sideNavId) {
            return function() {
                $mdSidenav(sideNavId).toggle();
            }
        }
    }

    function SideController($rootScope, $scope, $log, $mdDialog, MovieService, AddressService, MapService) {
        $scope.releaseYears = MovieService.getReleaseYears();
        $scope.limits = MovieService.getLimits();

        $scope.findNearMe = function () {
            $scope.$emit("closeSideNav");
            $rootScope.$emit("showSpinner");

            AddressService.getCurrentLocation()
                .then(function(location) {
                    $scope.data = {
                        locations: location.address
                    };
                    MapService.refresh($rootScope, $scope);
                })
                .catch(function(error) {
                    $log.debug("Failed to obtain address due to: ", error);
                    showAlert("Ooops", "Looks like location information is unavailable.");
                })
                .finally(function() {
                    $rootScope.$emit("hideSpinner");
                });
        };

        $scope.submit = function() {
            $scope.$emit("closeSideNav");
            MapService.refresh($rootScope, $scope);
        };

        $scope.$on("emptyResults", function() {
            showAlert("Ooops", "Sorry, but looks like no matches found.");
        });

        function showAlert(title, content) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector("#map")))
                    .clickOutsideToClose(true)
                    .title(title)
                    .textContent(content)
                    .ariaLabel(content)
                    .ok("Ok")
            );
        };
    }
})(window.angular);
