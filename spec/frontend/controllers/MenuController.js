describe("MenuController", function () {

    var $rootScope,
        $scope,
        $controller,
        $mdSidenav,
        sideNavCloseMock = jasmine.createSpy(),
        sideNavIsOpenMock = jasmine.createSpy(),
        sideNavToggleMock = jasmine.createSpy();


    beforeEach(function() {
        module("MenuController");

        $mdSidenav = jasmine.createSpy().and.callFake(function() {
            return {
                close: sideNavCloseMock,
                isOpen: sideNavIsOpenMock,
                toggle: sideNavToggleMock
            };
        });

        inject(function($injector){
            $rootScope = $injector.get("$rootScope");
            $scope = $rootScope.$new();
            $controller = $injector.get("$controller")("MenuController", {
                $scope: $scope,
                $mdSidenav: $mdSidenav
            });
        });

    });

    it("Should close sideNave", function () {
        $scope.close();
        expect(sideNavCloseMock).toHaveBeenCalled();
    });

    it("Should call sideNave isOpen", function () {
        $scope.isOpen();
        expect(sideNavIsOpenMock).toHaveBeenCalled();
    });

    it("Should call toggle on toggleSideNav", function () {
        $scope.toggleSidenav();
        expect(sideNavToggleMock).toHaveBeenCalled();
    });

});