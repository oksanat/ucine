describe("Page Model", function() {
    "use strict";

    var PageModel = require("../../../src/models/Page"),
        pageModel;

    beforeEach(function() {
        pageModel = new PageModel();
    });

    it("Should have apiKey defined", function() {
        expect(pageModel.apiKey).toBeDefined();
    });

    it("Tests Page title", function() {
        expect(pageModel.title).toBeDefined();
        expect(pageModel.title).toBeNull();
        var title = "title";
        pageModel.setTitle(title);
        expect(pageModel.title).toBe(title);
        expect(pageModel.getTitle()).toBe(title);
    });

    it("Tests Page header", function() {
        expect(pageModel.header).toBeDefined();
        expect(pageModel.header).toBeNull();
        var header = "header";
        pageModel.setHeader(header);
        expect(pageModel.header).toBe(header);
        expect(pageModel.getHeader()).toBe(header);
    });

    it("Tests Page subHeader", function() {
        expect(pageModel.subHeader).toBeDefined();
        expect(pageModel.subHeader).toBeNull();
        var subHeader = "subHeader";
        pageModel.setSubHeader(subHeader);
        expect(pageModel.subHeader).toBe(subHeader);
        expect(pageModel.getSubHeader()).toBe(subHeader);
    });

    it("Tests Page content", function() {
        expect(pageModel.content).toBeDefined();
        expect(pageModel.content).toBeNull();
        var content = "content";
        pageModel.setContent(content);
        expect(pageModel.content).toBe(content);
        expect(pageModel.getContent()).toBe(content);
    });

    it("Tests Page menuTooltip", function() {
        expect(pageModel.menuTooltip).toBeDefined();
        expect(pageModel.menuTooltip).toBeNull();
        var menuTooltip = "menuTooltip";
        pageModel.setMenuTooltip(menuTooltip);
        expect(pageModel.menuTooltip).toBe(menuTooltip);
        expect(pageModel.getMenuTooltip()).toBe(menuTooltip);
    });
});
