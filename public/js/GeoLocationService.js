(function () {
    "use strict";

    angular
        .module("GeoLocationService", [])
        .factory("GeoLocationService", Service);

    function Service($q, $window) {
        var service = {};
        service.getCurrentPosition = getCurrentPosition;

        return service;

        function getCurrentPosition() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                console.log("Geolocation is not supported.");
                deferred.reject("Geolocation is not supported.");
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        console.log("Err: ", err);
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }

    }

})(window.angular);
