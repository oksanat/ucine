describe('MovieModel', function() {

    var movieModel, httpBackend;

    beforeEach(function(){
        module("MovieModel");
        inject(function($injector){
            movieModel = $injector.get("MovieModel");
            httpBackend = $injector.get("$httpBackend");
            httpBackend
                .when("GET", /^http:\/\/127.0.0.1:8080\/(imdb)/)
                .respond(200, {
                    imdburl: "http://cool.url/",
                    plot: "Some story",
                    poster: "N/A",
                    actors: "Robin"
                });
        });

    });

    afterEach(function () {
        httpBackend.flush();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("setData", function() {
        it("should set properties from data", function(done) {
            var data = {
                actor_1: "Oksana",
                title: "Forgotten",
                director: "Director",
                fun_facts: "It's fun, trust me",
                locations: "London",
                release_year: 2009
            };

            var model = new movieModel(data);
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

        it("should get actors from imdb", function(done) {
            var data = {
                title: "Forgotten",
                release_year: 2009
            };

            var model = new movieModel(data);
            expect(model.actors).toBe('');
            done();
            expect(model.actors).toBe("Robin");
        });
    });

});