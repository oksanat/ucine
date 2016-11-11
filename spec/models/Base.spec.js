var Model = require("../../src/models/Base"),
    dbMockup = {};

describe("Base Model", function() {
    "use strict";

    it("Should create a new model", function() {
        var model = new Model(dbMockup);
        expect(model.db).toBeDefined();
        expect(model.extend).toBeDefined();
    });

    it("Should be extendable", function() {
        var model = new Model(dbMockup);
        var OtherTypeOfModel = model.extend({
            myCustomModelMethod: function() { }
        });
        var model2 = new OtherTypeOfModel(dbMockup);
        expect(model2.db).toBeDefined();
        expect(model2.myCustomModelMethod).toBeDefined();
    });
});
