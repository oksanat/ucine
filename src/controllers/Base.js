(function() {
    "use strict";

    var _ = require("underscore");

    module.exports = {
        name: "base",
        extend: function(child) {
            return _.extend({}, this, child);
        },

        get: function(req, res, next) {

        }
    };
})();