"use strict";
exports.__esModule = true;
var Geolocation_1 = require("./Geolocation");
var express = require('express');
var Particle_1 = require("./Particle");
// const Particle = require('./Particle');
// const app = express();
var app = express();
var port = process.env.PORT || 4202;
var host = process.env.HOST || 'http://localhost';
var pi = new Geolocation_1.GeoLocation('10.240.29.204');
var device = new Particle_1.Particle();
// Grabs GeoIP
setTimeout(function () {
    // console.log(`${JSON.stringify(pi.getGeoIp(), null, 4)}`);
}, 5000);
app.listen(port, function () {
    console.log("Listening on " + host + ":" + port + "..");
});
app.get('/', function (req, res) {
    console.log("Success");
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
