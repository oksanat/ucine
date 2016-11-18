describe("Home controller", function() {
    "use strict";
    var Home = require("../../../src/controllers/Home"),
        Model = require("../../../src/models/Page"),
        View = require("../../../src/views/Base"),
        model;

    beforeEach(function() {
        model = new Model();
    });

    it("Should have run method", function() {
        expect(Home.run).toBeDefined();
    });

    it("Should set title", function () {
        spyOn(Model.prototype, "setTitle");
        Home.run();
        expect(Model.prototype.setTitle).toHaveBeenCalled();
    });

    it("Should set setHeader", function () {
        spyOn(Model.prototype, "setHeader");
        Home.run();
        expect(Model.prototype.setHeader).toHaveBeenCalled();
    });

    it("Should set subHeader", function () {
        spyOn(Model.prototype, "setSubHeader");
        Home.run();
        expect(Model.prototype.setSubHeader).toHaveBeenCalled();
    });

    it("Should set setMenuTooltip", function () {
        spyOn(Model.prototype, "setMenuTooltip");
        Home.run();
        expect(Model.prototype.setMenuTooltip).toHaveBeenCalled();
    });

    it("Should render view", function () {
        spyOn(View.prototype, "render");
        Home.run();
        expect(View.prototype.render).toHaveBeenCalled();
    });
});
