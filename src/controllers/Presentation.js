(function() {
    "use strict";

    var BaseController = require("./Base"),
        View = require("../views/Base"),
        Model = require("../models/Presentation"),
        pageModel = new Model();

    module.exports = BaseController.extend({
        name: "Presentation",

        run: function(req, res, next) {
            var v = new View(res, "presentation");
            v.render(pageModel);
        }
    });
})();