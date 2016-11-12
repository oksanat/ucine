describe("Base view", function() {
    "use strict";
    var View = require("../../../src/views/Base");

    it("Should create and render new view", function() {
        var responseMockup = {
            render: function(template, data) {
                expect(data.myProperty).toBeDefined();
                expect(data.myProperty).toBe("value");
                expect(template).toBe("template-file");
            }
        };
        var v = new View(responseMockup, "template-file");
        v.render({myProperty: "value"});
    });

    it("Should be extendable", function() {
        var v = new View();
        var OtherView = v.extend({
            otherRender: function(data) {
                expect(data.prop).toBeDefined();
                expect(data.prop).toBe("yes");
            }
        });
        var otherViewInstance = new OtherView();
        expect(otherViewInstance.render).toBeDefined();
        otherViewInstance.otherRender({prop: "yes"});
    });

});