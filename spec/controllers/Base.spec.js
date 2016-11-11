var BaseController = require("../../src/controllers/Base");

describe("Base controller", function() {
    "use strict";

    it("Should have a method extend which returns a child instance", function() {
        expect(BaseController.extend).toBeDefined();
        var child = BaseController.extend({ name: "Child controller" });
        expect(child.get).toBeDefined();
        expect(child.name).toBe("Child controller");
    });

    it("Should be able to create different children", function() {
        var childA = BaseController.extend({ name: "child A", customProperty: "value" });
        var childB = BaseController.extend({ name: "child B" });
        expect(childA.name).not.toBe(childB.name);
        expect(childB.customProperty).not.toBeDefined();
    });
});
