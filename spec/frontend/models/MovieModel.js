describe('MovieModel', function() {

    var $movieModel,
        $httpBackend;

    beforeEach(function(){
        module("MovieModel");
        inject(function($injector) {
            $movieModel = $injector.get("MovieModel");
            $httpBackend = $injector.get("$httpBackend");
            $httpBackend
                .when("GET", /^http:\/\/127.0.0.1:8080\/(imdb)/)
                .respond(200, {
                    imdburl: "http://cool.url/",
                    plot: "Some story",
                    poster: "N/A",
                    actors: "Robin"
                });
        });
    });

    describe("setData", function() {

        afterEach(function () {
            $httpBackend.flush();
        });

        it("Should set properties from data", function(done) {
            var data = {
                actor_1: "Oksana",
                title: "Forgotten",
                director: "Director",
                fun_facts: "It's fun, trust me",
                locations: "London",
                release_year: 2009
            };

            var model = new $movieModel(data);
            expect(model.title).toBe(data.title);
            expect(model.actors).toBe(data.actor_1);
            expect(model.director).toBe(data.director);
            expect(model.fun_facts).toBe(data.fun_facts);
            expect(model.locations).toEqual(data.locations + ", San Francisco, CA");
            expect(model.production_company).toBeNull();
            done();
            expect(model.imdburl).toBe("http://cool.url/");
            expect(model.plot).toBe("Some story");
            expect(model.poster).toBe("N/A");
            // Actors should not be touched
            expect(model.actors).toBe(data.actor_1);
        });

        it("Should set actors from imdb if not defined in data", function(done) {
            var data = {
                title: "Forgotten",
                release_year: 2009
            };

            var model = new $movieModel(data);
            expect(model.actors).toBe('');
            done();
            expect(model.actors).toBe("Robin");
        });
    });

    describe("loaGeocode", function() {
        beforeEach(function(){
            $httpBackend
                .when("GET", /^http:\/\/127.0.0.1:8080\/(geocodes)/)
                .respond(200, {
                    address: "San Francisco",
                    coords: {
                        latitude: 37.7749295,
                        longitude: -122.4194155
                    },
                    formattedAddress: "San Francisco, CA, USA"
                });

        });

        afterEach(function () {
            $httpBackend.flush();
        });

        it("Should call geocodes Api and return promise", function(done) {
            var address = "San Francisco"
            var data = {
                title: "Forgotten",
                release_year: 2009
            };

            var model = new $movieModel(data);
            model.loadGeocode(address).then(function(geolocation) {
                expect(geolocation.data.formattedAddress).toBe("San Francisco, CA, USA");
            });
            done();
        });

    });

    describe("setGeolocation", function() {
        it("Should set geolocation", function(done) {
            var data = {
                    title: "Forgotten",
                    release_year: 2009
                },
                geolocation = {
                    address: "London",
                };

            var model = new $movieModel(data);
            done();
            model.setGeoLocation(geolocation);
            expect(model.geolocation).toEqual(geolocation);
        });
    });

});