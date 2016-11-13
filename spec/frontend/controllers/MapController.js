describe("MapController", function () {

    var $rootScope,
        $scope,
        $controller,
        mapService,
        movieService,
        utilsService;

    beforeEach(function() {
        module("MapController");

        inject(function($injector){
            $rootScope = $injector.get("$rootScope");
            $scope = $rootScope.$new();
            mapService = $injector.get("MapService");
            movieService = $injector.get("MovieService");
            utilsService = $injector.get("UtilsService");

            $controller = $injector.get("$controller")("MapController", {
                $scope: $scope
            });
        });

    });

    it("Should call map refresh on init", function () {
        spyOn(mapService, "refresh");
        $scope.init();
        expect(mapService.refresh).toHaveBeenCalled();
    });

});