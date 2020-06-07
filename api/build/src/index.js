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
var location = new Geolocation_1.GeoLocation();
var device = new Particle_1.Particle();
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
    var response = {
        items: {
            latitude: 36.214151845703125,
            longitude: -81.67890930175781
        }
    };
    // device.getDevices();
    logger.debug("[app] GET " + req.path);
    res.send(JSON.stringify(response));
});
process.on('uncaughtException', function (e) {
    logger.fatal("[app] " + e);
    process.exit(1);
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
