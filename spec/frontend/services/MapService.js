describe("MapService", function () {
    var $service,
        $rootScope,
        $scope,
        $q,
        $log,
        MovieService;

    beforeEach(module("MapService", function($provide) {
        MovieService = jasmine.createSpy();
        $provide.value("MovieService", MovieService);
    }));

    beforeEach(function() {
        inject(function($injector) {
            MovieService = $injector.get("MovieService");
            $q = $injector.get("$q");
            $log = $injector.get("$log");
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
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            });

            $service.addMovies($rootScope, $scope);
            $rootScope.$apply();
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith("emptyResults");
        });

        it("Should catch movie load error", function () {
            spyOn($scope, "$emit");
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject("Error");
                return deferred.promise;
            });

            $service.addMovies($rootScope, $scope);
            $rootScope.$apply();
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).not.toHaveBeenCalled();
        });

        it("Should ignore movies with empty locations", function () {
            spyOn($scope, "$emit");
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([{
                    title: "Forgotten"
                }]);
                return deferred.promise;
            });

            $service.addMovies($rootScope, $scope);
            $rootScope.$apply();
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).not.toHaveBeenCalledWith("emptyResults");
        });

        it("Should catch movie geolocation load error", function () {
            spyOn($rootScope, "$emit");
            var movie = {
                title: "Forgotten",
                locations: "102 Building",
                loadGeocode: jasmine.createSpy().and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.reject("Error load geolocation");
                    return deferred.promise;
                })
            };
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([movie]);
                return deferred.promise;
            });

            $service.addMovies($rootScope, $scope);
            $rootScope.$apply();
            expect(MovieService.search).toHaveBeenCalled();
            expect($rootScope.$emit).toHaveBeenCalledWith("hideSpinner");
        });
    });

    describe("refresh", function() {
        it("Should fire show spinner event on refresh", function () {
            spyOn($scope, "$emit");
            spyOn($rootScope, "$emit");
            spyOn($log, "debug");
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            });

            $service.refresh($rootScope, $scope);
            $rootScope.$apply();
            expect($rootScope.$emit).toHaveBeenCalledWith("showSpinner");
            expect(MovieService.search).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith("emptyResults");
        });

        it("Should initialise map only once", function () {
            spyOn($log, "debug");
            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            });

            $service.refresh($rootScope, $scope);
            $rootScope.$apply();
            $service.refresh($rootScope, $scope);
            $rootScope.$apply();
            expect($log.debug).toHaveBeenCalledWith("Map is undefined. Initialising");
            expect($log.debug.calls.count()).toEqual(1);
        });

        it("Should fire show spinner event on refresh", function () {
            $scope.data = {
                key: "not empty"
            };

            MovieService.search = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            });

            $service.refresh($rootScope, $scope);
            $rootScope.$apply();

            expect($scope.data.key).toEqual("not empty");
        });
    });
});