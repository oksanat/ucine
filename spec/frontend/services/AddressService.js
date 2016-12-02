describe("AddressService", function() {
    var $service,
        $window,
        $rootScope,
        $httpBackend,
        $http,
        $q,
        geoLocationService,
        address;

    beforeEach(module("AddressService", function($provide) {
        geoLocationService = jasmine.createSpy();
        $provide.value("GeoLocationService", geoLocationService);
    }));

    beforeEach(function() {
        inject(function($injector) {
            $window = $injector.get("$window");
            $rootScope = $injector.get("$rootScope");
            $httpBackend = $injector.get("$httpBackend");
            $http = $injector.get("$http");
            $q = $injector.get("$q");
            geoLocationService = $injector.get("GeoLocationService");
            $service = $injector.get("AddressService");
        });
    });

    describe("getCurrentLocation success flow", function () {
        beforeEach(function() {
            address = {
                address: "San Francisco",
                coords: {
                    latitude: 12.3,
                    longitude: -32.1
                },
                formattedAddress: "San Francisco, CA, USA"
            };
            geoLocationService.getCurrentPosition = jasmine.createSpy().and.callFake(function() {
                var position = {
                    coords: address.coords
                };
                var deferred = $q.defer();
                deferred.resolve(position);
                return deferred.promise;
            });

            $httpBackend
                .when("GET", "http://127.0.0.1:8080/addresses?latitude=12.3&longitude=-32.1")
                .respond(200, address);
        });

        it("Should call geoLocationService to get current position", function () {
            $service.getCurrentLocation();
            $rootScope.$apply();
            $httpBackend.flush();
            expect(geoLocationService.getCurrentPosition).toHaveBeenCalled();
        });

        it("Should call addresses Api to get address after successfully obtaining coordinates", function () {
            $service.getCurrentLocation()
                .then(function(location) {
                    expect(location.address).toEqual(address.address);
                    expect(location.coords).toEqual(address.coords);
                    expect(location.formattedAddress).toEqual(address.formattedAddress);
                });
            $rootScope.$apply();
            $httpBackend.flush();
            expect(geoLocationService.getCurrentPosition).toHaveBeenCalled();
        });
    });

    describe("getCurrentLocation error flow", function () {
        beforeEach(function() {
            geoLocationService.getCurrentPosition = jasmine.createSpy().and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject("Error");
                return deferred.promise;
            });
        });

        it("Should catch geolocation error", function () {
            spyOn($http, "get");
            $service.getCurrentLocation();
            $rootScope.$apply();
            expect(geoLocationService.getCurrentPosition).toHaveBeenCalled();
            expect($http.get).not.toHaveBeenCalled();
        });
    });
});