(function () {
    "use strict";

    angular
        .module("GeoLocationService", [])
        .factory("GeoLocationService", Service);

    function Service($q, $log, $window) {
        var service = {};
        service.getCurrentPosition = getCurrentPosition;

        return service;

        function getCurrentPosition() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                $log.debug("Geolocation is not supported.");
                deferred.reject("Geolocation is not supported.");
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (error) {
                        $log.debug("Failed to obtain geolocation due to: ", error);
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }

    }

})(window.angular);
