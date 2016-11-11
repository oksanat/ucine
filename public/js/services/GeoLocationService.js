(function () {
    "use strict";

    angular
        .module("GeoLocationService", [])
        .factory("GeoLocationService", Service);

    function Service($q, $http, $log, $window) {
        var service = {};
        service.getCurrentLocation = getCurrentLocation;

        return service;

        function getCurrentPosition() {

            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                $log.debug("Geolocation is not supported.");
                deferred.reject("Geolocation is not supported.");
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $log.debug("Obtained position", position);
                        deferred.resolve(position);
                    },
                    function (error) {
                        $log.debug("Failed to obtain geolocation due to: ", error);
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }

        function getCurrentLocation() {
            var deferred = $q.defer(),
                url = __env.apiUrl + "/addresses";

            getCurrentPosition()
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

})(window.angular);
