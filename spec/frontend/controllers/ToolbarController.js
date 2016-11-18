describe("ToolbarController", function () {
    var $rootScope,
        $window,
        $scope,
        $controller;

    beforeEach(function() {
        module("ToolbarController");

        inject(function($injector) {
            $window = $injector.get("$window");
            $rootScope = $injector.get("$rootScope");
            $scope = $rootScope.$new();
            $controller = $injector.get("$controller")("ToolbarController",
                {$scope: $scope}
            );
        });
    });

    it("should open window on openSource", function () {
        spyOn(window, "open");
        $scope.openSource();
        expect(window.open).toHaveBeenCalled();
    });
});