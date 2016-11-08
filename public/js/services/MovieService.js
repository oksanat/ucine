(function () {
    "use strict";

    angular
        .module("MovieService", ["MovieModel"])
        .factory("MovieService", Service);

    function Service($rootScope, $http, $q, __env, MovieModel) {
        var service = {},
            config = __env.movies,
            movies = [];

        service.getCurrentYearMovies = getCurrentYearMovies;
        service.getReleaseYears = getReleaseYears;
        service.search = search;

        function search(params) {
            console.log(params);
        }

        function getCurrentYear() {
            return new Date().getFullYear();
        }

        function prepareFieldsQuery(params) {
            var query = "";
            angular.forEach(params, function(value, key) {
                query += "&" + key + "=" + value;
            });
            return query.replace("&", "?");
        }

        function prepareHeaders() {
            return {
                "X-App-Token": config.appToken
            }
        }

        function loadMovies(params, limit) {

            // Perform an AJAX call to get all of the records in the db.
            var deferred = $q.defer(),
                limit = angular.isNullOrUndefined(limit) ? config.limit : limit,
                query = prepareFieldsQuery(params),
                where = encodeURIComponent("upper(title) not like '%SEASON%'"),
                url = config.sfgovUrl + query + "&$where=" + where + "&$limit=" + limit,
                httpConfig = {
                    headers: prepareHeaders()
                };

            $http
                .get(url, httpConfig)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(error) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getCurrentYearMovies(limit) {

            var deferred = $q.defer(),
                params = {
                    release_year: getCurrentYear()
                };

            loadMovies(params, limit)
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

        function getReleaseYears() {
            var years = [];
            for (var i = getCurrentYear(); i >= config.firstReleaseYear; i--) {
                years.push(i);
            }
            return years;
        }
        return service;
    }

})(window.angular);
