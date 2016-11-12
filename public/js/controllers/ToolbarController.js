(function () {
    "use strict";

    angular
        .module("ToolbarController", [])
        .controller("ToolbarController", Controller);

    function Controller($scope, $window) {
        $scope.openSource = function() {
            $window.open($window.__env.gitRepo, "_blank");
        }
    }

})(window.angular);
