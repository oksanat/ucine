var BaseController = require("./Base"),
    View = require("../views/Base"),
    movieModel = new (require("../models/Movie")),
    pageModel = new(require("../models/Page"));

module.exports = BaseController.extend({
    name: "Home",
    content: null,
    title: "Put yourself in the picture",

    run: function(req, res, next) {
        movieModel.setDB(req.db);
        var self = this;
        this.getContent(function() {
            var v = new View(res, "index");
            console.log(pageModel.title);
            v.render(pageModel);
        })
    },

    getContent: function(callback) {
        var self = this;
        this.content = {};
        callback();
    }
});
