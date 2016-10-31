(function () {
    "use strict";

    angular
        .module("ToolbarController", [])
        .controller("ToolbarController", Controller);

    function Controller($scope, $window) {
        $scope.openSource = function(repo) {
            $window.open(repo, "_blank");
        }
    }

})(window.angular);
