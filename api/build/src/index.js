"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pino_1 = __importDefault(require("pino"));
var Geolocation_1 = require("./Geolocation");
var Particle_1 = require("./Particle");
var app = express_1.default();
var logger = pino_1.default({
    level: process.env.LOG_LEVEL || 'trace',
    prettyPrint: {
        levelFirst: true,
        translateTime: true,
        ignore: 'pid,hostname'
    }
});
var geoLocation = new Geolocation_1.GeoLocation();
var particle = new Particle_1.Particle();
var port = process.env.PORT || 4202;
var host = process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';
app.listen(port, function () {
    logger.info("[app] Listening on " + host + ":" + port + "...");
});
// Allows CORS. To be replaced by proper package or possibly authentication system?
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', function (req, res) {
    var devices = particle.getAllDevices().then(function (response) { return response; });
    var deviceLocations = devices.then(function (response) {
        var devices = [];
        response.forEach(function (element) {
            var id = element.id, last_ip_address = element.last_ip_address;
            geoLocation.deviceIp = last_ip_address;
            var location = {
                latitude: geoLocation.location.longitude,
                longitude: geoLocation.location.latitude
            };
            devices.push({
                id: id,
                location: location
            });
        });
        return devices;
    });
    logger.debug("[app] GET " + req.path);
    deviceLocations.then(function (locations) {
        var body = { items: locations[0].location };
        res.send(JSON.stringify(body)); // works for one device for now
    });
});
process.on('uncaughtException', function (e) {
    logger.fatal("[app] " + e);
    process.exit(1);
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
