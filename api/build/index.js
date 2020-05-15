"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
app.listen(port, function () {
    console.log("Listening on " + host + ":" + port + "..");
});
app.get('/', function (req, res) {
    console.log('Success');
});
process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
