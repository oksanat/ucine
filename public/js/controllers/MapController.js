(function () {
    "use strict";

    angular
        .module("MapController", ["MapService"])
        .controller("MapController", Controller)
        .directive("movieInfo", Directive)

    function Controller($rootScope, $scope, MapService) {

        angular.element(document).ready(function () {
            MapService.refresh($rootScope, $scope);
        });

    }

    function Directive($window, MapService) {
        return {
            restrict: "E",
            scope: {
                movie: "=info"
            },
            link: function(scope, element, attrs) {
                scope.toggleStreetView = function() {
                    MapService.toggleStreetView(scope.movie.geolocation);
                };
                scope.openImdb = function () {
                    $window.open(scope.movie.imdburl, "_blank");
                };
                scope.openPoster = function () {
                    $window.open(scope.movie.poster, "_blank");
                }
            },
            templateUrl: "/templates/movieInfo.html"
        };
    }

})(window.angular);
