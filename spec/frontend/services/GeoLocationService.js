describe("GeoLocationService", function() {
    var $service,
        $window,
        $rootScope,
        $httpBackend,
        address;

    beforeEach(function() {
        module("GeoLocationService");

        address = {
            address: "San Francisco",
            coords: {
                latitude: 12.3,
                longitude: -32.1
            },
            formattedAddress: "San Francisco, CA, USA"
        };

        inject(function($injector) {
            $window = $injector.get("$window");
            $rootScope = $injector.get("$rootScope");
            $httpBackend = $injector.get("$httpBackend");

            spyOn($window.navigator.geolocation, "getCurrentPosition").and.callFake(function() {
                var position = {
                    coords: address.coords
                };
                arguments[0](position);
            });

            $httpBackend
                .when("GET", "http://127.0.0.1:8080/addresses?latitude=12.3&longitude=-32.1")
                .respond(200, address);
            $service = $injector.get("GeoLocationService");
        });
    });

    it("Should call window.navigator.geolocation to get current position", function () {
        $service.getCurrentLocation();
        $rootScope.$apply();
        $httpBackend.flush();
        expect($window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it("Should call addresses Api to get address", function () {
        $service.getCurrentLocation().then(function(location) {
            expect(location.address).toEqual(address.address);
            expect(location.coords).toEqual(address.coords);
            expect(location.formattedAddress).toEqual(address.formattedAddress);
        });
        $rootScope.$apply();
        $httpBackend.flush();
        expect($window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
});