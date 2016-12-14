(function () {
    "use strict";

    angular
        .module("SpinnerService", [])
        .factory("SpinnerService", Service);

    function Service($mdDialog) {
        var service = {},
            shown = false;
        service.showSpinner = showSpinner;
        service.hideSpinner = hideSpinner;

        return service;

        function showSpinner() {
            if (shown === true) {
                return;
            }
            $mdDialog
                .show({
                    templateUrl: "/templates/spinner.html",
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    fullscreen: false
                });
            shown = true;
        }

        function hideSpinner() {
            if (shown === false) {
                return;
            }
            $mdDialog.cancel();
            shown = false;
        }
    }
})(window.angular);
