describe("UtilsService", function() {

    var utilsService;

    beforeEach(function(){
        module("UtilsService");
        inject(function($injector) {
            utilsService = $injector.get("UtilsService");
        });
    });

    describe("isNullOrUndefined", function() {

        it("Should return true for null value", function () {
            var result = utilsService.isNullOrUndefined(null);
            expect(result).toBeTruthy();
        });

        it("Should return true for undefined value", function () {
            var result = utilsService.isNullOrUndefined();
            expect(result).toBeTruthy();
        });

        it("Should return false for int value", function () {
            var result = utilsService.isNullOrUndefined(1);
            expect(result).toBeFalsy();
        });

    });

    describe("isEmpty", function() {
        it("Should return true for empty obj", function () {
            var result = utilsService.isEmpty({});
            expect(result).toBeTruthy();
        });

        it("Should return false for obj with values", function () {
            var result = utilsService.isEmpty({a: "a"});
            expect(result).toBeFalsy();
        });
    });

    describe("isBoolean", function() {
        it("Should return true for boolean", function () {
            var result = utilsService.isBoolean(true);
            expect(result).toBeTruthy();
        });

        it("Should return false for string", function () {
            var result = utilsService.isBoolean("a");
            expect(result).toBeFalsy();
        });
    });
});