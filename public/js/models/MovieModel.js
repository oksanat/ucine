(function () {
    "use strict";

    angular
        .module("MovieModel", [])
        .factory("MovieModel", Model);

    function Model ($http, $q, $window) {

        function Movie(data) {
            this.setData(data);
        };

        Movie.prototype = {
            setData: function(data) {
                this.actors = this.getActors(data);
                this.director = angular.isDefined(data.director) ? data.director : null;
                this.fun_facts = angular.isDefined(data.fun_facts) ? data.fun_facts : null;
                this.locations = angular.isDefined(data.locations) ? data.locations + ", San Francisco, CA" : null;
                this.production_company = angular.isDefined(data.production_company) ? data.production_company : null;
                this.release_year = angular.isDefined(data.release_year) ? data.release_year : null;
                this.title = angular.isDefined(data.title) ? data.title : null;
                this.loadImdbInfo(this.title, this.release_year);
            },

            getActors: function (data) {
                return [data.actor_1, data.actor_2, data.actor_3].filter(function (val) {return val;}).join(', ');
            },

            setGeoLocation: function (geolocation) {
                this.geolocation = geolocation;
            },

            loadGeocode: function(address) {
                // Perform an AJAX call to get all of the records in the db.
                var deferred = $q.defer(),
                    url = $window.__env.apiUrl + "/geocodes",
                    config = {
                        params: {
                            address: address
                        }
                    };

                $http
                    .get(url, config)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            loadImdbInfo: function(title, year) {
                // Perform an AJAX call to get all of the records in the db.
                var deferred = $q.defer(),
                    url = $window.__env.apiUrl + "/imdb",
                    config = {
                        params: {
                            name: encodeURIComponent(title),
                            year: year
                        }
                    },
                    self = this;
                $http
                    .get(url, config)
                    .then(function(response) {
                        var data = response.data;
                        self.imdburl = data.imdburl;
                        if (!self.actors) {
                            self.actors = data.actors;
                        }
                        self.plot = data.plot;
                        self.poster = data.poster;
                        deferred.resolve(data);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }

        };
        return Movie;
    }

})(window.angular);
