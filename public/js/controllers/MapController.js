(function () {
    "use strict";

    angular
        .module("MapController", ["MapService", "GeoLocationService"])
        .controller("MapController", Controller)
        .directive("movieInfo", Directive)

    function Controller($scope, GeoLocationService, MapService) {
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
                MapService.refresh($scope, position);
            });

    }

    function Directive(MapService) {
        return {
            restrict: "E",
            scope: {
                movie: "=info"
            },
            link: function(scope, element, attrs) {
                scope.toggleStreetView = function() {
                    MapService.toggleStreetView(scope.movie.geolocation);
                }
            },
            templateUrl: "/templates/movieInfo.html"
        };
    }

})(window.angular);
