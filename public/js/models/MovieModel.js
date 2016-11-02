(function () {
    "use strict";

    angular
        .module("MovieModel", [])
        .factory("MovieModel", Model);

    function Model ($http, $q) {

        function Movie(data) {
            this.setData(data);
        };

        Movie.prototype = {
            setData: function(data) {
                this.actor_1 = angular.isDefined(data.actor_1) ? data.actor_1 : null;
                this.actor_2 = angular.isDefined(data.actor_2) ? data.actor_2 : null;
                this.actor_3 = angular.isDefined(data.actor_3) ? data.actor_3 : null;
                this.director = angular.isDefined(data.director) ? data.director : null;
                this.fun_facts = angular.isDefined(data.fun_facts) ? data.fun_facts : null;
                this.locations = angular.isDefined(data.locations) ? data.locations + ", San Francisco" : null;
                this.production_company = angular.isDefined(data.production_company) ? data.production_company : null;
                this.release_year = angular.isDefined(data.release_year) ? data.release_year : null;
                this.title = angular.isDefined(data.title) ? data.title : null;
            },

            loadGeocode: function(address) {
                // Perform an AJAX call to get all of the records in the db.
                var deferred = $q.defer(),
                    url = "http://127.0.0.1:8080/geocodes",
                    config = {
                        params: {
                            address: address
                        }
                    };

                $http
                    .get(url, config)
                    .success(function(response) {
                        console.log(response);
                        deferred.resolve(response);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

        };
        return Movie;
    }

})(window.angular);
