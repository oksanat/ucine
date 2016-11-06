var BaseController = require("./Base"),
    model = new (require("../models/Geocode")),
    config = require("../../config")(),
    _ = require("underscore"),
    NodeGeocoder = require("node-geocoder");

module.exports = BaseController.extend({
    name: "Geocode",
    content: null,

    run: function(req, res, next) {
        model.setDb(req.db);

        var self = this,
            geocoder = NodeGeocoder(config.maps);

        this.getLocation(req.query.address, function() {
            if (_.isEmpty(self.content)) {
                // Query API and save to Db
                geocoder.geocode(req.query.address)
                    .then(function(data) {
                        var location = {
                            address: req.query.address,
                            formattedAddress: data[0].formattedAddress,
                            latitude: data[0].latitude,
                            longitude: data[0].longitude
                        };
                        self.insertLocation(location, function() {});
                        res.json(location);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            } else {
                res.json(self.content);
            }
        });
    },

    insertLocation: function(location, callback) {
        model.insert(location, function(err, objects) {
            callback();
        });
    },

    getLocation: function(address, callback) {
        var self = this;
        this.content = {};
        model.getList(function(err, records) {
            if(records.length > 0) {
                self.content = records[0];
            }
            callback();
        }, { address: address });
    }
});
