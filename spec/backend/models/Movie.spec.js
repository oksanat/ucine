describe("Movie Model", function() {
    "use strict";

    var Model = require("../../../src/models/Movie"),
        Imdb = require("imdb-api"),
        Q = require("q"),
        model,
        data;

    beforeEach(function() {
        model = new Model();
        data = {
            name: "Night before Christmas",
            year: 1986
        };
    });

    it("Should have getInfo method", function() {
        expect(model.getInfo).toBeDefined();
    });

    it("Should call Imdb Api to get data", function() {
        spyOn(Imdb, "getReq").andCallFake(function() {
            var deferred = Q.defer();
            deferred.resolve({a: "aaa", b: "N/A"});
            return deferred.promise;
        });

        model.getInfo(data);
        expect(Imdb.getReq).toHaveBeenCalled();
    });

    it("Should set N/A fields to null", function() {
        spyOn(Imdb, "getReq").andCallFake(function() {
            var deferred = Q.defer();
            deferred.resolve({a: "aaa", b: "N/A"});
            return deferred.promise;
        });

        model.getInfo(data)
            .then(function(response) {
                expect(response.b).toBeNull();
            });
        expect(Imdb.getReq).toHaveBeenCalled();
    });
});
