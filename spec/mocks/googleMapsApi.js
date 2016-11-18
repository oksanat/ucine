var google = {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
            return {
                setMap: function() {}
            };
        },
        InfoWindow : function () {
        },
        LatLng: function(lat, lng) {
            return [lat, lng];
        },
        LatLngBounds: function(sw, ne) {
            return {
                extend: function() {}
            };
        },
        Map: function(obj) {
            return {
                getStreetView: function () {
                    return {
                        setOptions: function () {
                            
                        }
                    };
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