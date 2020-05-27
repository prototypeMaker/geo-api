"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
var pino_1 = __importDefault(require("pino"));
var logger = pino_1.default({
    level: process.env.LOG_LEVEL || 'trace',
    prettyPrint: {
        levelFirst: true,
        translateTime: true,
        ignore: 'pid,hostname'
    }
});
var Particle = /** @class */ (function () {
    function Particle($url) {
        this.url = $url || "https://api.particle.io/v1/devices";
        this.authenticate();
    }
    Particle.prototype.authenticate = function ($url) {
        var token = process.env.TKNParticle;
        var options = "https://api.particle.io/v1/devices?access_token=" + token;
        var req = https.get(options, function (res) {
            res.on('data', function (d) {
                logger.debug("[services/Particle] " + res.statusCode + ": " + res.statusMessage + ", authentication success");
                logger.trace("[services/Particle] " + d.toString());
            });
        });
        req.on('error', function (e) {
            logger.error("[server/Particle] " + e);
        });
        req.end();
    };
    Particle.prototype.devices = function () {
        var url = "https://api.particle.io/v1/devices/";
        this.authenticate(url);
    };
    return Particle;
}());
exports.Particle = Particle;
