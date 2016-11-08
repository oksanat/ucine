var BaseController = require("./Base"),
    View = require("../views/Base"),
    pageModel = new(require("../models/Page"));

module.exports = BaseController.extend({
    name: "Home",

    run: function(req, res, next) {
        pageModel.setTitle("Put yourself in the picture");
        pageModel.setHeader("Film Locations: San Francisco");
        pageModel.setSubHeader("If you love movies, and you love San Francisco, you're bound to love this ...");

        var self = this;
        this.getContent(function() {
            var v = new View(res, "index");
            v.render(pageModel);
        })
    },

    getContent: function(callback) {
        var self = this;
        this.content = {};
        callback();
    }
});
