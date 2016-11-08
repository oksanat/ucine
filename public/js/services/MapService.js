(function () {
    "use strict";

    angular
        .module("MapService", ["MovieModel", "MovieService"])
        .factory("MapService", Service);

    function Service($rootScope, $http, $compile, __env, MovieModel, MovieService) {
        var service = {},
            config = __env.maps,
            map,
            panorama,
            infowindow;
        service.refresh = refresh;
        service.toggleStreetView = toggleStreetView;

        return service;

        function initialize() {
            var position = config.position,
                initLatLng = new google.maps.LatLng(position.lat, position.lng),
                mapOptions = {
                    zoom: config.zoom,
                    center: initLatLng,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.BOTTOM_RIGHT
                    }
                },
                marker = new google.maps.Marker({
                    position: initLatLng,
                    title: "San Francisco"
                });

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            infowindow = new google.maps.InfoWindow();
            marker.setMap(map);

            // Default panorama and set up some defaults.
            panorama = map.getStreetView();
            panorama.setOptions({
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM
                }
            });
        }

        function refresh(scope) {
            if (angular.isNullOrUndefined(map)) {
                initialize();
            }
            addCurrentYearMovies(scope);
        }

        function addCurrentYearMovies(scope) {

            var prepareContent = function (movie) {
                    scope.movie = movie;
                    return ($compile("<movie-info info=movie></movie-info>")(scope)[0]);
                },
                limit = config.limit;

            MovieService.getCurrentYearMovies()
                .then(function(movies) {
                    movies.forEach(function(movie) {
                        movie.loadGeocode(movie.locations)
                            .then(function(geolocation) {
                                var latLng = new google.maps.LatLng(geolocation.latitude, geolocation.longitude),
                                    marker = new google.maps.Marker({
                                        map: map,
                                        position: latLng,
                                        title: movie.title + " (" + movie.release_year + ")"
                                    });
                                movie.setGeoLocation(geolocation);
                                google.maps.event.addListener(marker, "click", function (marker, movie, infowindow){
                                    return function() {
                                        infowindow.setContent(prepareContent(movie));
                                        infowindow.open(map, marker);
                                    };
                                } (marker, movie, infowindow));
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
        
        function toggleStreetView(geolocation) {
            var toggle = panorama.getVisible();
            if (toggle == false) {
                panorama.setPosition({
                    lat: geolocation.latitude,
                    lng: geolocation.longitude
                });
                panorama.setVisible(true);
            } else {
                panorama.setVisible(false);
            }
        }

    }

})(window.angular);
