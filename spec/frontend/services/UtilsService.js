describe("$service", function() {

    var $service;

    beforeEach(function(){
        module("UtilsService");
        inject(function($injector) {
            $service = $injector.get("UtilsService");
        });
    });

    describe("isNullOrUndefined", function() {

        it("Should return true for null value", function () {
            var result = $service.isNullOrUndefined(null);
            expect(result).toBeTruthy();
        });

        it("Should return true for undefined value", function () {
            var result = $service.isNullOrUndefined();
            expect(result).toBeTruthy();
        });

        it("Should return false for int value", function () {
            var result = $service.isNullOrUndefined(1);
            expect(result).toBeFalsy();
        });

    });

    describe("isEmpty", function() {
        it("Should return true for empty obj", function () {
            var result = $service.isEmpty({});
            expect(result).toBeTruthy();
        });

        it("Should return false for obj with values", function () {
            var result = $service.isEmpty({a: "a"});
            expect(result).toBeFalsy();
        });
    });

    describe("isBoolean", function() {
        it("Should return true for boolean", function () {
            var result = $service.isBoolean(true);
            expect(result).toBeTruthy();
        });

        it("Should return false for string", function () {
            var result = $service.isBoolean("a");
            expect(result).toBeFalsy();
        });
    });
});