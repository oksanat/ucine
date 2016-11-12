(function() {
    "use strict";

    var BaseController = require("./Base"),
        Model = require("../models/Geocode"),
        model = new Model(),
        config = require("../../config")(),
        _ = require("underscore"),
        NodeGeocoder = require("node-geocoder");

    module.exports = BaseController.extend({
        name: "Geocode",
        location: null,
        geocoder: NodeGeocoder(config.maps),


        geocode: function(req, res, next) {
            model.setDb(req.db);

            var self = this,
                params = {
                    address: req.query.address
                };

            this.getLocation(params, function() {
                if (_.isEmpty(self.location)) {
                    // Query API and save to Db
                    self.geocoder.geocode(req.query.address)
                        .then(function(data) {
                            if (!self.validate(data)) {
                                return;
                            }
                            data[0].address = req.query.address;
                            var location = self.prepareLocationObj(data);
                            self.insertLocation(location, function() {});
                            res.json(location);
                        })
                        .catch(function(err) {
                            console.log("Failed to obtain coordinates due to: ", err);
                        });
                } else {
                    res.json(self.location);
                }
            });
        },

        reverse: function(req, res, next) {
            model.setDb(req.db);

            var self = this,
                latitude = req.query.latitude,
                longitude = req.query.longitude,
                params = {
                    coords: {
                        latitude: latitude,
                        longitude: longitude
                    }
                };

            this.getLocation(params, function() {
                if (_.isEmpty(self.location)) {
                    // Query API and save to Db
                    self.geocoder.reverse({ lat: latitude, lon: longitude })
                        .then(function(data) {
                            var location = self.prepareLocationObj(data);
                            self.insertLocation(location, function() {});
                            res.json(location);
                        })
                        .catch(function(error) {
                            console.log("Failed to obtain address due to: ", error);
                        });
                } else {
                    res.json(self.location);
                }
            });
        },

        insertLocation: function(location, callback) {
            model.insert(location, function(err, objects) {
                callback();
            });
        },

        getLocation: function(queryObj, callback) {
            var self = this;
            this.location = {};

            model.getList(function(err, records) {
                if(records.length > 0) {
                    self.location = records[0];
                }
                callback();
            }, queryObj);
        },

        prepareLocationObj: function(data) {
            var location = {
                address: !_.isEmpty(data[0].address) ? data[0].address : data[0].streetName,
                formattedAddress: data[0].formattedAddress,
                coords: {
                    latitude: data[0].latitude.toFixed(7),
                    longitude: data[0].longitude.toFixed(7)
                }
            };
            return location;
        },

        checkBoundaries: function (location) {
            if ((location.latitude < config.boundaries.sw.lat && location.latitude > config.boundaries.ne.lat) &&
                (location.longitude < config.boundaries.sw.lng && location.longitude > config.boundaries.ne.lng)) {
                return true;
            }
            return false;
        },

        validate: function (data) {
            if (data === null || data === undefined ||
                data[0] === null || data[0] === undefined) {
                return false;
            }
            if (!this.checkBoundaries(data[0])) {
                console.log("Address is out of boundaries: ", data[0].formattedAddress);
                return false;
            }
            return true;
        }

    });

})();