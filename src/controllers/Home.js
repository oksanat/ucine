(function() {
    "use strict";

    var BaseController = require("./Base"),
        View = require("../views/Base"),
        Model = require("../models/Page"),
        pageModel = new Model();

    module.exports = BaseController.extend({
        name: "Home",

        run: function(req, res, next) {
            pageModel.setTitle("Put yourself in the picture");
            pageModel.setHeader("Film Locations: San Francisco");
            pageModel.setSubHeader("If you love movies, and you love San Francisco, you're bound to love this ...");
            pageModel.setMenuTooltip("Find the titles, locations, fun facts, names and much more.");

            var v = new View(res, "index");
            v.render(pageModel);
        }
    });

})();