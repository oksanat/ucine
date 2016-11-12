describe("Imdb controller", function() {
    "use strict";

    var Imdb = require("../../src/controllers/Imdb"),
        Model = require("../../src/models/Movie"),
        Q = require("q"),
        model,
        request,
        resource;

    beforeEach(function() {
        model = new Model();
        request = {
            query: {
                name: "Night before Christmas",
                year: 1986
            }
        };
        resource = {
            send: function() {},
            json: function() {},
            status: function() {}
        };
    });

    it("Should have run method", function() {
        expect(Imdb.run).toBeDefined();
    });

    it("Should call model getInfo to get data", function() {
        spyOn(Model.prototype, "getInfo").andCallFake(function(){
            var deferred = Q.defer();
            deferred.resolve({title: "Night before Christmas", poster: "N/A"});
            return deferred.promise;
        });

        Imdb.run(request, resource, function() {});
        expect(Model.prototype.getInfo).toHaveBeenCalled();
    });

    it("Should set status to 500 when request fails", function() {
        spyOn(Model.prototype, "getInfo").andCallFake(function(){
            var deferred = Q.defer();
            deferred.reject("Something went wrong");
            return deferred.promise;
        });

        resource.status = function(status) {
            expect(status).toBe(500);
        };
        Imdb.run(request, resource, function() {});
        expect(Model.prototype.getInfo).toHaveBeenCalled();
    });

});
