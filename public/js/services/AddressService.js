(function () {
    "use strict";

    angular
        .module("AddressService", ["GeoLocationService"])
        .factory("AddressService", Service);

    function Service($q, $http, $log, $window, GeoLocationService) {
        var service = {};
        service.getCurrentLocation = getCurrentLocation;
        return service;

        function getCurrentLocation() {
            var deferred = $q.defer(),
                url = $window.__env.apiUrl + "/addresses";

            GeoLocationService.getCurrentPosition()
                .then(function(position) {
                    var config = {
                        params: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    };
                    $http
                        .get(url, config)
                        .success(function(location) {
                            $log.debug("Obtained location", location);
                            deferred.resolve(location);
                        })
                        .error(function(error) {
                            deferred.reject(error);
                        });
                })
                .catch(function(error) {
                    $log.debug("Failed to obtain geolocation due to: ", error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
}) (window.angular);