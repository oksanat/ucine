describe("ToolbarController", function () {

    var scope, window, Controller;

    beforeEach(module("ToolbarController"));

    beforeEach(inject(function($controller, $window) {
        scope = {};
        window = $window;
        Controller = $controller('ToolbarController', {
            $scope: scope
        });
    }));

    it('should test window open event', function () {
        spyOn(window, 'open');
        scope.openSource();
        expect(window.open).toHaveBeenCalled();
    });

});