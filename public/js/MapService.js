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
                    parseAddress(response);
                })
                .error(function(error) {
                    console.log(error);
                });

        }

        function parseAddress(locations) {
            var geocoder = new google.maps.Geocoder(),
                marker;

            console.log(MovieModel);
            locations.forEach(function(location, i) {
                geocoder.geocode( {'address': location.locations + ", San Francisco"}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        console.log("Geocode was not successful for the following reason: ", status);
                    }
                });
            });
        }

    }

})(window.angular);
