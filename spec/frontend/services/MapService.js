describe("MapService", function () {

    var $service,
        $rootScope,
        $scope,
        $q,
        MovieService;

    beforeEach(module("MapService", function($provide) {
        MovieService = jasmine.createSpy();
        MovieService.search = jasmine.createSpy().and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        });

        $provide.value("MovieService", MovieService);
    }));

    beforeEach(function() {

        inject(function($injector) {
            MovieService = $injector.get("MovieService");
            $q = $injector.get("$q");
            $rootScope = $injector.get("$rootScope");
            $scope = $rootScope.$new();
            $service = $injector.get("MapService");
        });

    });

    describe("toggleStreetView", function() {
        it("Should do nothing by default", function () {
            expect($service.toggleStreetView()).toBeUndefined();
        });
    });

    describe("addMovies", function() {

        it("Should search movies and fire event on empty results", function () {
            spyOn($scope, "$emit");
            $service.addMovies($rootScope, $scope);
            $rootScope.$apply();
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith("emptyResults");
        });
    });

    describe("refresh", function() {

        it("Should fire show spinner event on refresh", function () {
            spyOn($scope, "$emit");
            spyOn($rootScope, "$emit");
            $service.refresh($rootScope, $scope);
            $rootScope.$apply();

            expect($rootScope.$emit).toHaveBeenCalledWith("showSpinner");
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith("emptyResults");
        });
    });

});