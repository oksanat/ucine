(function () {
    "use strict";

    angular
        .module("MapService", ["MovieModel"])
        .factory("MapService", Service);

    function Service($rootScope, $http, MovieModel) {
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
            loadSeasonMovies();
        }

        function loadSeasonMovies() {
            // Perform an AJAX call to get all of the records in the db.
            var headers = {
                headers: {"X-App-Token": "nKzpXKLBeO9G8uRKNSL5wTrST"}
            };

            $http.get("https://data.sfgov.org/resource/wwmu-gmzc.json?$where=upper(title) like '%25SUMMER%25'", headers)
                .success(function(response) {
                    drawMarkers(response);
                })
                .error(function(error) {
                    console.log(error);
                });

        }

        function drawMarkers(locations) {
            var marker,
                movies = parseLocations(locations);

            movies.forEach(function(movie) {
                movie.getGeoLocation()
                    .then(function(data) {
                        if (!angular.isDefined(data)){
                            throw "Empty location data";
                        }
                        map.setCenter(data[0].geometry.location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: data[0].geometry.location
                        });
                    })
                    .catch(function(error) {
                        console.info("Failed to obtain current position, skipping");
                    });

            });
        }

        function parseLocations(locations) {
            var movies = [];
            locations.forEach(function(location) {
                movies.push(new MovieModel(location));
            });
            return movies;
        }

    }

})(window.angular);
