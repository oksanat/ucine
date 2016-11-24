describe("App", function () {
    var $rootScope,
        SpinnerService;

    beforeEach(module("App"));

    beforeEach(function() {
        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            SpinnerService = $injector.get("SpinnerService");
        });
    });

    it("Should show spinner on snowSpinner event", function () {
        spyOn(SpinnerService, "showSpinner");
        $rootScope.$broadcast("showSpinner");
        expect(SpinnerService.showSpinner).toHaveBeenCalled();
    });

    it("Should hide spinner on hideSpinner event", function () {
        spyOn(SpinnerService, "hideSpinner");
        $rootScope.$broadcast("hideSpinner");
        expect(SpinnerService.hideSpinner).toHaveBeenCalled();
    });
});