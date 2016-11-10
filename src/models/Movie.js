var Model = require("./Base"),
    Imdb = require('imdb-api'),
    Q = require("q"),
    _ = require("underscore"),
    model = new Model();

var Movie = model.extend({
    getInfo: function(data) {
        
        var parseData = function (data) {
            // Remove N/A
            _.each(data, function(value, key){
                if (value === "N/A") {
                    data[key] = null;
                }
            });
        };

        var deferred = Q.defer();
        Imdb.getReq({ name: decodeURIComponent(data.name), year: data.year})
            .then(function(data) {
                parseData(data);
                deferred.resolve(data);
            })
            .catch(function(error) {
                console.info("Failed to load IMDb movie data due to: ", error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

});
module.exports = Movie;
