(function () {
    "use strict";

    angular
        .module("MenuController", ["ngMaterial"])
        .controller("MenuController", Controller)
        .controller("SideController", SideController);

    function Controller($scope, $timeout, $mdSidenav, $log) {
        var sideNavId = "sideNav";
        $scope.toggleSidenav = buildToggler(sideNavId);

        $scope.isOpen = function() {
            return $mdSidenav("sideNav").isOpen();
        };

        /**
        * Supplies a function that will continue to operate until the
        * time is up.
        */
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildToggler(sideNavId) {
            return function() {
                $mdSidenav(sideNavId).toggle();
            }
        }
    }

    function SideController($scope, $mdSidenav) {
        $scope.close = function () {
            $mdSidenav("sideNav").close();
        };
    }

})(window.angular);
