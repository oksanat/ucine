/**
 * Module dependencies.
 */
var express = require("express"),
    http = require("http"),
    path = require("path"),
    config = require("./config")(),
    app = express(),
    favicon = require("serve-favicon");
    Home = require("./src/controllers/Home"),
    Geocode = require("./src/controllers/Geocode"),
    MongoClient = require("mongodb").MongoClient;

app.set("views", __dirname + "/src/templates");
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

MongoClient.connect("mongodb://" + config.mongo.host + ":" + config.mongo.port + "/ucine", function(err, db) {
    if (err) {
        console.error("Failed to connect to mongodb due to ", err);
    } else {

        var attachDb = function(req, res, next) {
                req.db = db;
                next();
            },
            checkRequiredParam = function(params) {
                return function(req, res, next) {
                    params.forEach(function(param) {
                        if (!req.query[param]) {
                            var err = {
                                status: {
                                    code: 400,
                                    text: "Missing one or more required params"
                                }
                            };
                            return next(err);
                        }
                    });
                    next();
                }
            },
            errorHandler = function(err, req, res, next) {
                console.log(err);
                res.status(err.status.code).send(err);
            };

        app.all('/', attachDb, function(req, res, next) {
            Home.run(req, res, next);
        });

        app.get('/geocodes', checkRequiredParam(["address"]), attachDb, function(req, res, next) {
            Geocode.run(req, res, next);
        });

        app.use(errorHandler);

        http.createServer(app).listen(config.port, function() {
              console.log(
                  "Successfully connected to mongodb://" + config.mongo.host + ":" + config.mongo.port,
                  "\nServer listening on port " + config.port
              );
        });
    }
});


