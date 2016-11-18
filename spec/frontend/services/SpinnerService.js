describe("SpinnerService", function() {
    var $service,
        $mdDialog;

    beforeEach(module("SpinnerService", function($provide) {
        $mdDialog = jasmine.createSpy();
        $mdDialog.show = jasmine.createSpy().and.callFake(function() {});
        $mdDialog.cancel = jasmine.createSpy().and.callFake(function() {});

        $provide.value("$mdDialog", $mdDialog);
    }));

    beforeEach(function() {
        inject(function($injector) {
            $service = $injector.get("SpinnerService");
        });
    });

    describe("showSpinner", function() {
        it("Should open dialog if not shown", function () {
            $service.showSpinner();
            expect($mdDialog.show).toHaveBeenCalled();
        });

        it("Should open dialog only once", function () {
            $service.showSpinner();
            $service.showSpinner();
            expect($mdDialog.show).toHaveBeenCalledTimes(1);
        });
    });

    describe("hideSpinner", function() {
        it("Should cancel dialog if shown", function () {
            $service.showSpinner();
            $service.hideSpinner();
            expect($mdDialog.cancel).toHaveBeenCalled();
        });

        it("Should cancel dialog only if shown", function () {
            $service.hideSpinner();
            expect($mdDialog.cancel).toHaveBeenCalledTimes(0);
        });
    });
});