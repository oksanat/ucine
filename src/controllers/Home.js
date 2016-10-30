var BaseController = require("./Base"),
    View = require("../views/Base"),
    movieModel = new (require("../models/Movie")),
    pageModel = new(require("../models/Page"));

module.exports = BaseController.extend({
    name: "Home",

    run: function(req, res, next) {
        movieModel.setDb(req.db);
        pageModel.setTitle("Put yourself in the picture");
        pageModel.setHeader("Film Locations: San Francisco");

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
