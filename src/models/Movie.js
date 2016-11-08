var Model = require("./Base"),
    Imdb = require('imdb-api'),
    Q = require('q'),
    model = new Model();

var Movie = model.extend({
    getInfo: function(data) {
        var deferred = Q.defer();
        Imdb.getReq({ name: decodeURIComponent(data.name), year: data.year})
            .then(function(data) {
                deferred.resolve(data);
            })
            .catch(function(error) {
                console.info("Failed to load imdb movie data due to: ", error);
                deferred.reject(error);
            });
        return deferred.promise;
    }

});
module.exports = Movie;
