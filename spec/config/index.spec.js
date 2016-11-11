describe("Configuration setup", function() {

    "use strict";

    it("Should load DEV configuration by default", function() {
        var config = require("../../config")();
        expect(config.env).toBe("DEV");
    });

    it("Should load QA configuration on demand", function() {
        var config = require("../../config")("QA");
        expect(config.env).toBe("QA");
    });

    it("Should load DEV configuration if ENV is not found", function() {
        var config = require("../../config")("LIVE");
        expect(config.env).toBe("DEV");
    });
});
