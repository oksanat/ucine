var BaseController = require("./Base"),
    model = new (require("../models/Movie")),
    config = require("../../config")();

module.exports = BaseController.extend({
    name: "Imdb",
    content: null,

    run: function(req, res, next) {
        var self = this;
        model.getInfo({ name: req.query.name, year: req.query.year })
            .then(function(data) {
                self.content = data;
                res.json(self.content);
            })
            .catch(function(err) {
                console.log("Failed to load imdb data due to: ", err);
                res.status(500);
                return next("Failed to load imdb data.");
            });
    }

});
