describe("MovieService", function() {

    var $service,
        $httpBackend,
        $rootScope,
        MovieModel,
        data;

    beforeEach(module("MovieService", function($provide) {
        MovieModel = jasmine.createSpy();
        $provide.value("MovieModel", MovieModel);
    }));

    beforeEach(function(){

        inject(function($injector) {
            $httpBackend = $injector.get("$httpBackend");
            $rootScope = $injector.get("$rootScope");
            MovieModel = $injector.get("MovieModel");

            data = [{
                "actor_1":  "Adam Rose",
                "director": "Terry Zwigoff",
                "distributor": "Amazon ",
                "locations": "Gough Street & Clay Street",
                "title": "Budding Prospects, Pilot",
                "writer": "Melissa Axelrod, T. C. Boyle (based on the book by)"
            }];
            $service = $injector.get("MovieService");
        });

    });

    describe("getLimits", function() {
        it("Should return list of limits", function () {
            var limits = $service.getLimits();
            expect(limits).toEqual([10, 50, 100, 500]);
        });
    });

    describe("getReleaseYears", function() {
        it("Should return list of release years from 1924 to current year", function () {
            var years = $service.getReleaseYears(),
                current = new Date().getFullYear();
            expect(years[0]).toBe(current);

            expect(years[years.length-1]).toBe(1924);
            expect(years.length).toBe((current - 1924) + 1);
        });
    });

    describe("search", function() {
        it("Should use default limit", function() {
            var searchData = {};
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&" +
                    "$order=release_year DESC")
                .respond(200, data);

            $service.search({});
            $rootScope.$apply();
        });

        it("Should use provided limit", function() {
            var searchData = {
                limit: 20
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=20&" +
                    "$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should use title in where like", function() {
            var searchData = {
                title: "Budding"
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&"+
                    "$where=upper(title) like '%25BUDDING%25'&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should use locations in where like", function() {
            var searchData = {
                locations: "London"
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&" +
                    "$where=upper(locations) like '%25LONDON%25'&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should use actors in where like", function() {
            var searchData = {
                actors: "Oksana"
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&" +
                    "$where=(upper(actor_1) like '%25OKSANA%25' OR upper(actor_2) like '%25OKSANA%25' " +
                    "OR upper(actor_3) like '%25OKSANA%25')&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should use fun_facts if it's set to true in where like", function() {
            var searchData = {
                funFacts: true
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&" +
                    "$where=fun_facts is not null&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should use release year in fields query like", function() {
            var searchData = {
                year: 2015
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&" +
                    "release_year=2015&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        it("Should ignore everything else", function() {
            var searchData = {
                random: 2015
            };
            $httpBackend
                .when("GET", "https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=10&$order=release_year DESC")
                .respond(200, data);

            $service.search(searchData);
            $rootScope.$apply();
        });

        afterEach(function() {
            $httpBackend.flush();
        });
    });

});