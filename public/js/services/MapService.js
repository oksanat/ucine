(function () {
    "use strict";

    angular
        .module("MapService", ["MovieService", "UtilsService"])
        .factory("MapService", Service);

    function Service($log, $compile, $window, MovieService, UtilsService) {
        var service = {},
            config = $window.__env.maps,
            map,
            panorama,
            infowindow,
            markers = [],
            bounds = new google.maps.LatLngBounds();

        service.refresh = refresh;
        service.addMovies = addMovies;
        service.toggleStreetView = toggleStreetView;

        return service;

        function initialize() {
            var position = config.position,
                initLatLng = new google.maps.LatLng(position.lat, position.lng),
                mapOptions = {
                    zoom: config.zoom,
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
            markers.push(marker);
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            infowindow = new google.maps.InfoWindow();
            marker.setMap(map);
            bounds.extend(initLatLng);

            // Default panorama and set up some defaults.
            panorama = map.getStreetView();
            panorama.setOptions({
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM
                }
            });
        }

        function refresh(rootScope, scope) {
            rootScope.$emit("showSpinner");
            if (UtilsService.isNullOrUndefined(map)) {
                $log.debug("Map is undefined. Initialising");
                initialize();
            }
            if (UtilsService.isNullOrUndefined(scope.data)) {
                scope.data = {};
            }
            addMovies(rootScope, scope);
        }

        function addMovies(rootScope, scope) {
            var prepareContent = function (movie) {
                    scope.movie = movie;
                    return ($compile("<movie-info info=movie></movie-info>")(scope)[0]);
                },
                params = {
                    limit: $window.__env.movies.limit
                };

            MovieService.search(angular.extend(params, scope.data))
                .then(function(movies) {
                    if (UtilsService.isEmpty(movies)) {
                        scope.$emit("emptyResults");
                        return;
                    }
                    deleteMarkers();
                    movies.forEach(function(movie) {
                        if (UtilsService.isNullOrUndefined(movie.locations)) {
                            $log.debug("Movie '" + movie.title + "' location is undefined, skipping");
                            return;
                        }
                        movie.loadGeocode(movie.locations)
                            .then(function(geolocation) {
                                var latLng = new google.maps.LatLng(geolocation.coords.latitude, geolocation.coords.longitude),
                                    marker = new google.maps.Marker({
                                        map: map,
                                        position: latLng,
                                        title: movie.title + " (" + movie.release_year + ")",
                                        animation: google.maps.Animation.DROP
                                    });
                                markers.push(marker);
                                bounds.extend(latLng);

                                movie.setGeoLocation(geolocation);
                                google.maps.event.addListener(marker, "click", function (marker, movie, infowindow) {
                                    return function() {
                                        infowindow.setContent(prepareContent(movie));
                                        infowindow.open(map, marker);
                                    };
                                } (marker, movie, infowindow));
                            })
                            .catch(function(error) {
                                $log.debug("Failed to obtain movie geolocation, skipping", error);
                            })
                            .finally(function() {
                                if (!UtilsService.isNullOrUndefined(map)) {
                                    map.fitBounds(bounds);
                                }
                                rootScope.$emit("hideSpinner");
                            });
                    });
                })
                .catch(function(error) {
                    $log.debug("Failed to parse movie data due to: ", error);
                })
                .finally(function() {
                    markers[0].setMap(null);
                });
        }
        
        function toggleStreetView(geolocation) {
            if (UtilsService.isNullOrUndefined(panorama)) {
                return;
            }
            var toggle = panorama.getVisible();
            if (toggle === false) {
                panorama.setPosition({
                    lat: geolocation.latitude,
                    lng: geolocation.longitude
                });
                panorama.setVisible(true);
            } else {
                panorama.setVisible(false);
            }
        }

        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function deleteMarkers() {
            setMapOnAll(null);
            markers = [];
        }
    }
})(window.angular);
