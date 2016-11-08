(function () {
    "use strict";

    angular
        .module("ToolbarController", [])
        .controller("ToolbarController", Controller);

    function Controller($scope, $window, __env) {
        $scope.openSource = function() {
            $window.open(__env.gitRepo, "_blank");
        }
    }

})(window.angular);
