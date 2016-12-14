(function () {
    "use strict";

    angular
        .module("UtilsService", [])
        .factory("UtilsService", Service);

    function Service() {
        var service = {};

        service.isNullOrUndefined = isNullOrUndefined;
        service.isEmpty = isEmpty;
        service.isBoolean = isBoolean;

        return service;

        function isNullOrUndefined(value) {
            return angular.isUndefined(value) || value === null;
        }

        function isEmpty(obj) {
            for (var i in obj) if (obj.hasOwnProperty(i)) return false;
            return true;
        }

        function isBoolean(value) {
            return typeof value === "boolean";
        };
    }
})(window.angular);
