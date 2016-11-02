(function () {
    "use strict";

    angular
        .module("MovieService", ["MovieModel"])
        .factory("MovieService", Service);

    function Service($rootScope, $http, $q, MovieModel) {
        var service = {},
            movies = [];

        service.getMovies = getMovies;

        function loadMovies() {

            // Perform an AJAX call to get all of the records in the db.
            var deferred = $q.defer(),
                url = "https://data.sfgov.org/resource/wwmu-gmzc.json?$where=upper(title) like '%25SUMMER%25'",
                config = {
                    headers: {
                        "X-App-Token": "nKzpXKLBeO9G8uRKNSL5wTrST"
                    }
                };

            $http
                .get(url, config)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(error) {
                    deferred.reject(err);
                });

            return deferred.promise;

        }

        function getMovies() {
            var deferred = $q.defer();
            loadMovies()
                .then(function(data) {
                    parseLocations(data);
                    deferred.resolve(movies);
                })
                .catch(function(error) {
                    console.info("Failed to parse movie data due to: ", error);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function parseLocations(locations) {
            locations.forEach(function(location) {
                movies.push(new MovieModel(location));
            });
        }

        return service;
    }

})(window.angular);
