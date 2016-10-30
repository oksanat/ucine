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
        };

        app.all('/', attachDb, function(req, res, next) {
            Home.run(req, res, next);
        });

        http.createServer(app).listen(config.port, function() {
              console.log(
                  "Successfully connected to mongodb://" + config.mongo.host + ":" + config.mongo.port,
                  "\nExpress server listening on port " + config.port
              );
        });
    }
});
