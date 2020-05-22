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
    level: 'fatal',
    prettyPrint: {
        levelFirst: true,
        translateTime: true
    }
});
var Particle = /** @class */ (function () {
    function Particle($url) {
        this.url = $url || "https://api.particle.io/v1/devices";
        this.authenticate();
    }
    Particle.prototype.authenticate = function ($url) {
        var token = process.env.TKNParticle;
        var options = this.url + "?access_token=" + token;
        https
            .request(options, function (res) {
            console.log('hi');
            var authResults = '';
            res.statusCode == 200
                ? (authResults = 'success')
                : (authResults = 'failed');
            logger.debug("[Particle] HTTP " + res.statusCode + ": Authentication " + authResults);
        })
            .on('error', function (error) {
            console.log('bye');
            logger.warn("[Particle] Error attempting to Authentication. Error: " + error);
        });
    };
    Particle.prototype.devices = function () {
        var url = "https://api.particle.io/v1/devices/";
        this.authenticate(url);
    };
    return Particle;
}());
exports.Particle = Particle;
