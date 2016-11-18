(function() {
    "use strict";

    module.exports = function(db) {
        this.db = db;
    };

    module.exports.prototype = {
        extend: function(properties) {
            var Child = module.exports;
            Child.prototype = module.exports.prototype;
            for(var key in properties) {
                Child.prototype[key] = properties[key];
            }
            return Child;
        },

        setDb: function(db) {
            this.db = db;
        },

        collection: function() {
            if (!this._collection) {
                this._collection = this.db.collection("ucine-content");
            }
            return this._collection;
        }
    };
})();