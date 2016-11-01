(function () {
    "use strict";

    angular
        .module("MovieModel", [])
        .factory("MovieModel", Model);

    var Model = function (data) {
        console.log(data);
    }
    return Model;

})(window.angular);
