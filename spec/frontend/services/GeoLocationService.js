describe("GeoLocationService", function() {
    var $service,
        $window,
        $rootScope,
        $q;

    beforeEach(function() {
        module("GeoLocationService");
        inject(function($injector) {
            $window = $injector.get("$window");
            $rootScope = $injector.get("$rootScope");
            $q = $injector.get("$q");
            $service = $injector.get("GeoLocationService");
        });
    });

    describe("getCurrentPosition success flow", function () {
        it("Should get current position and return position", function () {
            var position = {
                coords: {
                    latitude: 12.3,
                    longitude: -32.1
                }
            };
            spyOn($window.navigator.geolocation, "getCurrentPosition").and.callFake(function(error) {
                arguments[0](position);
            });
            $service.getCurrentPosition().then(function(currentPosition) {
                expect(currentPosition).toEqual(position);
                done();
            }, function() {
                done(new Error("Promise should have been resolved"));
                done();
            });
        });
    });

    describe("getCurrentPosition failure flow", function () {
        it("Should reject promised when failed to obtain position", function () {
            spyOn($window.navigator.geolocation, "getCurrentPosition").and.callFake(function(error) {
                arguments[1]("Failed to obtain current position");
            });

            $service.getCurrentPosition().then(function() {
                done(new Error("Promise should not be resolved"));
            }, function(reason) {
                expect(reason).toEqual("Failed to obtain current position");
                done();
            });
        });
    });
});