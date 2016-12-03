describe("MapController", function () {
    var $rootScope,
        $scope,
        $compile,
        $templateCache,
        $controller,
        mapService,
        movieService,
        utilsService;

    beforeEach(function() {
        module("MapController");
        module("templates");

        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            $compile = $injector.get("$compile");
            $templateCache = $injector.get("$templateCache");
            $scope = $rootScope.$new();
            mapService = $injector.get("MapService");
            movieService = $injector.get("MovieService");
            utilsService = $injector.get("UtilsService");

            $controller = $injector.get("$controller")("MapController", {
                $scope: $scope
            });
        });
    });

    describe("Controller", function () {
        it("Should call map refresh on init", function () {
            spyOn(mapService, "refresh");
            $scope.init();
            expect(mapService.refresh).toHaveBeenCalled();
        });
    });

    describe("Directive", function () {
        var element;

        beforeEach(function() {
            element = $compile("<movie-info info=movie></movie-info>")($scope);
        });

        it("Should have title and release year in h3 tag", function() {
            $scope.movie = {
                title: "Strictly Ballroom",
                release_year: 2008
            };
            $scope.$digest();
            var header = element.find("h3");
            expect(header.text()).toBe("Strictly Ballroom (2008)");
        });

        it("Should have actors in content when property is defined", function() {
            $scope.movie = {
                actors: "Robin Williams"
            };
            $scope.$digest();
            var contents = element.find("div.content div");
            expect(contents.length).toBe(1);
            expect(contents.eq(0).text()).toContain("Robin Williams");
        });

        it("Should have director in content when property is defined", function() {
            $scope.movie = {
                director: "Martin Scorsese"
            };
            $scope.$digest();
            var contents = element.find("div.content div");
            expect(contents.length).toBe(1);
            expect(contents.eq(0).text()).toContain("Martin Scorsese");
        });

        it("Should have fun_facts in content when property is defined", function() {
            $scope.movie = {
                fun_facts: "Something funny"
            };
            $scope.$digest();
            var contents = element.find("div.content");
            expect(contents.length).toBe(1);
            expect(contents.eq(0).text()).toContain("Something funny");
        });

        it("Should have locations in content when property is defined", function() {
            $scope.movie = {
                locations: "102 California"
            };
            $scope.$digest();
            var contents = element.find("div.content div");
            expect(contents.length).toBe(1);
            expect(contents.eq(0).text()).toContain("102 California");
        });

        it("Should have plot in content when property is defined", function() {
            $scope.movie = {
                plot: "Once upon a time..."
            };
            $scope.$digest();
            var contents = element.find("div.content div");
            expect(contents.length).toBe(1);
            expect(contents.eq(0).text()).toContain("Once upon a time...");
        });

        it("Should have actors, director, locations, plot and fun_facts in content when properties are defined", function() {
            $scope.movie = {
                actors: "Robin Williams",
                director: "Martin Scorsese",
                locations: "102 California",
                fun_facts: "Something funny",
                plot: "Once upon a time..."
            };
            $scope.$digest();
            var contents = element.find("div.content div");
            expect(contents.length).toBe(5);
            expect(contents.eq(0).text()).toContain("Robin Williams");
            expect(contents.eq(1).text()).toContain("Martin Scorsese");
            expect(contents.eq(2).text()).toContain("Something funny");
            expect(contents.eq(3).text()).toContain("102 California");
            expect(contents.eq(4).text()).toContain("Once upon a time...");
        });

        it("Should open imdburl link in new tab", function() {
            spyOn(window, "open");
            $scope.movie = {
                imdburl: "http://anything.com"
            }
            $scope.$digest();
            element.find(".imdb").triggerHandler("click");
            expect(window.open).toHaveBeenCalledWith("http://anything.com", "_blank");
        });

        it("Should open poster link in new tab", function() {
            spyOn(window, "open");
            $scope.movie = {
                poster: "http://poster.com"
            }
            $scope.$digest();
            element.find(".poster").triggerHandler("click");
            expect(window.open).toHaveBeenCalledWith("http://poster.com", "_blank");
        });

        it("Should call MapService to toggle street view", function() {
            spyOn(mapService, "toggleStreetView");
            $scope.movie = {
                geolocation: "Mocked"
            }
            $scope.$digest();
            element.find(".streetview").triggerHandler("click");
            expect(mapService.toggleStreetView).toHaveBeenCalledWith("Mocked");
        });
    });
});

