var google = {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
            return {
                setMap: function () {}
            };
        },
        Animation: function () {
            return {
                DROP: 2
            };
        },
        InfoWindow : function () {
        },
        LatLng: function (lat, lng) {
            return [lat, lng];
        },
        LatLngBounds: function (sw, ne) {
            return {
                extend: function() {}
            };
        },
        event: {
            addListener: function () {}
        },
        Map: function (obj) {
            return {
                getStreetView: function () {
                    return {
                        setOptions: function () {}
                    };
                },
                fitBounds: function (bounds) {
                    return true;
                }
            };
        },
        MapTypeControlStyle: {
            HORIZONTAL_BAR: 1
        },
        ControlPosition: {
            BOTTOM_RIGHT: 1
        }
    }
};
