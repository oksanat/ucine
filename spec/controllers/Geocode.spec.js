describe("Geocode controller", function() {
    "use strict";
    
    var Geocode = require("../../src/controllers/Geocode"),
        Model = require("../../src/models/Geocode"),
        config = require("../../config")(),
        Q = require("q"),
        NodeGeocoder = require("node-geocoder");

    describe("Geocode defined methods", function() {
        it("Should have geocode method", function() {
            expect(Geocode.geocode).toBeDefined();
        });

        it("Should have reverse method", function() {
            expect(Geocode.reverse).toBeDefined();
        });

    });

    describe("Geocode checkBoundaries", function() {
        var coordsIn, coordsOut;

        beforeEach(function() {
            coordsIn = {
                latitude: 37.7,
                longitude: -122.4
            };
            coordsOut = {
                latitude: 35.7,
                longitude: -1.4
            };
        });

        it("Should return true if coordinates are in boundaries", function() {
            var result = Geocode.checkBoundaries(coordsIn);
            expect(result).toBe(true);
        });


        it("Should return false if coordinates are out boundaries", function() {
            var result = Geocode.checkBoundaries(coordsOut);
            expect(result).toBe(false);
        });

    });

    describe("Geocode validate data", function() {
        var coordsIn, coordsOut;

        beforeEach(function() {
            coordsIn = {
                latitude: 37.7,
                longitude: -122.4
            };
            coordsOut = {
                latitude: 35.7,
                longitude: -1.4
            };
        });

        it("Should return false if data is null", function() {
            var result = Geocode.validate();
            expect(result).toBe(false);
        });

        it("Should return false if data is empty", function() {
            var result = Geocode.validate([]);
            expect(result).toBe(false);
        });

        it("Should return true if coordinates are in boundaries", function() {
            var result = Geocode.validate([coordsIn]);
            expect(result).toBe(true);
        });


        it("Should return false if coordinates are out boundaries", function() {
            var result = Geocode.validate([coordsOut]);
            expect(result).toBe(false);
        });

    });

    describe("Geocode prepareLocationObj", function() {
        var data;
        beforeEach(function() {
            data = [{
                address: "Lewisham High Street",
                streetName: "High Street",
                formattedAddress: "102 Lewisham High Street, London",
                latitude: 37.60401212123123,
                longitude: -123.0137123123123
            }];
        });

        it("Should use address by default", function() {
            var location = Geocode.prepareLocationObj(data);
            expect(location.address).toBe(data[0].address);
        });

        it("Should use streetName if address is missing", function() {
            data[0].address = null;
            var location = Geocode.prepareLocationObj(data);
            expect(location.address).toBe(data[0].streetName);
        });

        it("Should have coords with 7 digits after the decimal point", function() {
            var countDecimals = function(number) {
                return (number.split('.')[1] || []).length;
            };
            var location = Geocode.prepareLocationObj(data);
            expect(countDecimals(location.coords.latitude)).toBe(7);
            expect(countDecimals(location.coords.longitude)).toBe(7);
        });

    });

    describe("Geocode insertlocation", function() {
        it("Should call model insert to insert location", function() {
            var location = {};
            spyOn(Model.prototype, "insert").andCallFake(function(){
                return true;
            });

            Geocode.insertLocation(location, function() {});
            expect(Model.prototype.insert).toHaveBeenCalled();
        });
    });

    describe("Geocode geLocation", function() {
        it("Should call model getList in order to get location", function() {
            var queryObj = {};
            spyOn(Model.prototype, "getList").andCallFake(function(){
                return {};
            });

            Geocode.getLocation(queryObj, function() {});
            expect(Model.prototype.getList).toHaveBeenCalled();
        });
    });

    describe("Geocode reverse", function() {
        var request,
            resource;

        beforeEach(function() {
            request = {
                query: {
                    latitude: 37.6040,
                    longitude: -123.0137
                }
            };
            resource = {
                send: function() {},
                json: function() {},
                status: function() {}
            };
        });

        it("Should use data from cache if exists", function() {

            spyOn(Model.prototype, "getList").andCallFake(function(callback) {
                callback(null, [{address: "Lewisham High Street"}]);
            });
            resource.json = function(location) {
                expect(location).toEqual({address: "Lewisham High Street"});
            };
            Geocode.reverse(request, resource, function() {});
            expect(Model.prototype.getList).toHaveBeenCalled();
        });

        it("Should call geocoder.reverse if data doesn't exist", function() {

            var geocoder = NodeGeocoder(config.maps),
                data = [{
                    address: "Lewisham High Street",
                    streetName: "High Street",
                    formattedAddress: "102 Lewisham High Street, London",
                    latitude: 37.60401212123123,
                    longitude: -123.0137123123123
                }];
            Geocode.setGeocoder(geocoder);
            spyOn(Model.prototype, "getList").andCallFake(function(callback) {
                callback(null, []);
            });

            spyOn(geocoder, "reverse").andCallFake(function() {
                var deferred = Q.defer();
                deferred.reject("Failed to lookup data");
                return deferred.promise;
            });

            Geocode.reverse(request, resource, function() {});
            expect(Model.prototype.getList).toHaveBeenCalled();
            expect(geocoder.reverse).toHaveBeenCalled();

        });
    });

    describe("Geocode geocode", function() {
        var request,
            resource;

        beforeEach(function() {
            request = {
                query: {
                    address: "Lewisham High Street",
                    latitude: 37.6040,
                    longitude: -123.0137
                }
            };
            resource = {
                send: function() {},
                json: function() {},
                status: function() {}
            };
        });

        it("Should use data from cache if exists", function() {

            spyOn(Model.prototype, "getList").andCallFake(function(callback) {
                callback(null, [{address: "Lewisham High Street"}]);
            });
            resource.json = function(location) {
                expect(location).toEqual({address: "Lewisham High Street"});
            };

            Geocode.geocode(request, resource, function() {});
            expect(Model.prototype.getList).toHaveBeenCalled();
        });

        it("Should call geocoder.geocode if data doesn't exist", function() {

            var geocoder = NodeGeocoder(config.maps),
                data = [{
                    address: "Lewisham High Street",
                    streetName: "High Street",
                    formattedAddress: "102 Lewisham High Street, London",
                    latitude: 37.60401212123123,
                    longitude: -123.0137123123123
                }];
            Geocode.setGeocoder(geocoder);

            spyOn(Model.prototype, "getList").andCallFake(function(callback) {
                callback(null, []);
            });

            spyOn(geocoder, "geocode").andCallFake(function() {
                var deferred = Q.defer();
                deferred.reject("Failed to geocode data");
                return deferred.promise;
            });

            Geocode.geocode(request, resource, function() {});
            expect(Model.prototype.getList).toHaveBeenCalled();
            expect(geocoder.geocode).toHaveBeenCalled();
        });
    });
});
