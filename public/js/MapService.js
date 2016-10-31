(function () {
    "use strict";

    angular
        .module("MapService", [])
        .factory("MapService", Service);

    function Service($rootScope, $http) {
        var service = {};

        service.initialize = initialize;
        service.refresh = refresh;

        return service;

        function initialize(position) {
            if (!angular.isDefined(position)) {
                position = {
                    coords: {
                        latitude: 37.773972,
                        longitude: -122.431297
                    }
                };
            }
            var initLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                mapOptions = {
                    zoom: 15,
                    center: initLatLng,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.BOTTOM_RIGHT
                    }
                },
                map = new google.maps.Map(document.getElementById('map'), mapOptions),
                marker = new google.maps.Marker({
                    position: initLatLng,
                    title: "Hello World!"
                });
            marker.setMap(map);
        }

        function refresh(position) {
            initialize(position);
        }

    }

})(window.angular);
