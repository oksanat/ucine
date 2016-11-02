var Model = require("./Base"),
    crypto = require("crypto"),
    model = new Model();

var Geocode = model.extend({

    insert: function(data, callback) {
        data.Id = crypto.randomBytes(20).toString("hex"); 
        this.collection().insert(data, {}, callback || function(){ });
    },

    update: function(data, callback) {
        this.collection().update({Id: data.Id}, data, {}, callback || function(){ });
    },

    getList: function(callback, query) {
        this.collection().find(query || {}).toArray(callback);
    }

});
module.exports = Geocode;
