(function () {
    "use strict";

    angular
        .module("SidebarController", [])
        .controller("SidebarController", Controller)
        .directive("sidebarDirective", SidebarDirective);

    function Controller($scope) {
        $scope.state = false;

        $scope.toggleState = function() {
            $scope.state = !$scope.state;
        };
    }

    function SidebarDirective() {
        return {
            link : function(scope, element, attr) {
                scope.$watch(attr.sidebarDirective, function(newVal) {
                      if (newVal) {
                        element.addClass("show");
                        return;
                      }
                      element.removeClass("show");
                });
            }
        };
    }

})(window.angular);
