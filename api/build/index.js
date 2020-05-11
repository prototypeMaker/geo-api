"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geolocation_1 = require("./Geolocation");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 4202;
var host = process.env.HOST || 'http://localhost';
var pi = new Geolocation_1.GeoLocation('152.10.249.31', 'd7b3fca89ad66271efaa93d4d483939d');
// Grabs GeoIP
setTimeout(function () {
    console.log("" + JSON.stringify(pi.getGeoIp(), null, 4));
}, 5000);
app.listen(port, function () {
    console.log("Listening on " + host + ":" + port + "..");
});
app.get('/', function (req, res) {
    res.send('hello world');
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
