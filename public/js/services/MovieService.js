(function () {
    "use strict";

    angular
        .module("MovieService", ["MovieModel"])
        .factory("MovieService", Service);

    function Service($log, $http, $q, __env, MovieModel) {
        var service = {},
            config = __env.movies,
            movies = [];

        service.search = search;
        service.getMostRecentMovies = getMostRecentMovies;
        service.getReleaseYears = getReleaseYears;
        service.getLimits = getLimits;

        // Public methods
        function search(data) {
            $log.debug(data);
            var where = [],
                fieldsQuery = "",
                whereQuery = "",
                limit = angular.isNullOrUndefined(data.limit) ? config.limit : data.limit,
                params = {},
                deferred = $q.defer();

            if (!angular.isNullOrUndefined(data.title)) {
                where.push(prepareWhereClause("title", data.title));
            }
            if (!angular.isNullOrUndefined(data.locations)) {
                where.push(prepareWhereClause("locations", data.locations));
            }
            if (!angular.isNullOrUndefined(data.actors)) {
                var actors = [];
                actors.push(prepareWhereClause("actor_1", data.actors));
                actors.push(prepareWhereClause("actor_2", data.actors));
                actors.push(prepareWhereClause("actor_3", data.actors));
                where.push("(" + actors.join(" OR ") + ")");
            }
            if (data.funFacts === true) {
                where.push(prepareWhereClause("fun_facts", data.funFacts));
            }
            if (!angular.isNullOrUndefined(data.year)) {
                fieldsQuery = prepareFieldsQuery({
                    release_year: data.year
                });
            }
            if (!angular.isEmpty(where)){
                whereQuery = where.join(" AND ");
            }
            params = {
                limit: limit,
                where: whereQuery,
                fields: fieldsQuery
            }
            loadMovies(params)
                .then(function(data) {
                    parseLocations(data);
                    $log.debug(movies);
                    deferred.resolve(movies);
                })
                .catch(function(error) {
                    $log.debug("Failed to load movie data due to: ", error);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getMostRecentMovies(limit) {
            var deferred = $q.defer(),
                params = {
                    limit: limit,
                };

            loadMovies(params)
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

        function getReleaseYears() {
            var years = [];
            for (var i = getCurrentYear(); i >= config.firstReleaseYear; i--) {
                years.push(i);
            }
            return years;
        }

        function getLimits() {
            return [10, 50, 100, 500];
        }

        // Private methods
        function getCurrentYear() {
            return new Date().getFullYear();
        }

        function prepareWhereClause(key, value) {
            if (angular.isBoolean(value)) {
                return key + " is not null";
            } else {
                return "upper(" + key + ") like '" + encodeURIComponent("%" + value.toUpperCase() + "%")+"'";
            }
        }

        function prepareFieldsQuery(params) {
            var fields = [];
            angular.forEach(params, function(value, key) {
                fields.push(key + "=" + value);
            });
            return fields.join("&");
        }

        function prepareHeaders() {
            return {
                "X-App-Token": config.appToken
            }
        }

        function prepareUrl(params) {
            var orderByQuery = angular.isNullOrUndefined(params.orderBy) ? getDefaultOrderByQuery() : params.orderBy,
                limit = angular.isNullOrUndefined(params.limit) ? config.limit : params.limit,
                url = config.sfgovUrl + "?$limit=" + limit;

            if (!angular.isNullOrUndefined(params.where)) {
                url += "&$where=" + params.where;
            }
            if (!angular.isNullOrUndefined(params.fields)) {
                url += "&" + params.fields;
            }
            return url + "&" + orderByQuery;
        }

        function loadMovies(params) {

            // Perform an AJAX call to get all of the records in the db.
            var deferred = $q.defer(),
                httpConfig = {
                    headers: prepareHeaders()
                },
                url = prepareUrl(params);

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

        function getDefaultOrderByQuery() {
            return "$order=release_year DESC";
        }

        function parseLocations(locations) {
            movies = [];
            locations.forEach(function(location) {
                movies.push(new MovieModel(location));
            });
        }

        return service;
    }

})(window.angular);
