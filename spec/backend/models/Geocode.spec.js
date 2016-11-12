describe("Geocode Model", function() {
    "use strict";
    var GeocodeModel = require("../../../src/models/Geocode"),
        MongoMock = require("mongomock"),
        model;

    beforeEach(function() {
        model = new GeocodeModel();

        // Initial mock data
        var db = {
            "ucine-content":[{ "address" : "Bay Bridge"}]
        };
        var mongo = new MongoMock(db);
        model.setDb(mongo);
    });

    it("Should return list of matched addresses", function() {
        model.getList(function() {});
        model.getList(function(err, records) {
            expect(records).toBeDefined();
            expect(records.length).toBe(1);
            expect(records[0].address).toBe("Bay Bridge");
        }, { "address": "Bay Bridge" });
    });

    it("Should return empty list if nothing was found", function() {
        model.getList(function() {});
        model.getList(function(err, records) {
            expect(records).toEqual([]);
        }, { "address": "London" });
    });

    it("Should insert record", function() {
        var location = {
            address: "Holborn, London, UK"
        };
        model.insert(location, function() {});
        model.getList(function(err, records) {
            expect(records).toBeDefined();
            expect(records.length).toBe(1);
            expect(records[0].address).toBe("Holborn, London, UK");
        }, { "address": "Holborn, London, UK" });
    });

});
