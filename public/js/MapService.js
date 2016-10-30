(function () {
    "use strict";

    angular
        .module("MapService", [])
        .factory("MapService", Service);

    function Service($rootScope, $http) {
        var service = {};

        // Default location
        var defaultLocation = {
            lat: 39.50,
            long: -98.35
        }

        service.Initialize = Initialize;
        return service;

        function Initialize() {
            // Create a new map and place in the index.html page
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: new google.maps.LatLng(defaultLocation.lat, defaultLocation.long)
            });
        }

    }

})(window.angular);
