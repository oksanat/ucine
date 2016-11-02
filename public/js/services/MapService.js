(function () {
    "use strict";

    angular
        .module("MapService", ["MovieModel", "MovieService"])
        .factory("MapService", Service);

    function Service($rootScope, $http, MovieModel, MovieService) {
        var service = {},
            map;
        service.initialize = initialize;
        service.refresh = refresh;

        return service;

        function initialize(position) {
            var initLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                mapOptions = {
                    zoom: 14,
                    center: initLatLng,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.BOTTOM_RIGHT
                    }
                },
                marker = new google.maps.Marker({
                    position: initLatLng,
                    title: "Hello World!"
                });

            map = new google.maps.Map(document.getElementById('map'), mapOptions),
            marker.setMap(map);
        }

        function refresh(position) {
            initialize(position);
            addMarkers();
        }

        function addMarkers() {
            var marker;
            MovieService.getMovies()
                .then(function(movies) {
                    movies.forEach(function(movie) {
                        movie.loadGeocode(movie.locations)
                            .then(function(data) {
                                var latLng = new google.maps.LatLng(data.latitude, data.longitude);
                                map.setCenter(latLng);
                                marker = new google.maps.Marker({
                                    map: map,
                                    position: latLng
                                });
                            })
                            .catch(function(error) {
                                console.info("Failed to obtain movie geolocation, skipping");
                            });
                    });
                })
                .catch(function(error) {
                    console.info("Failed to parse movie data due to: ", error);
                });
        }

    }

})(window.angular);
