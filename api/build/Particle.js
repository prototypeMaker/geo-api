"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
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
            var authResults = 'none';
            res.statusCode == 200
                ? (authResults = 'success')
                : (authResults = 'failed');
            console.log("[Particle] HTTP " + res.statusCode + ": Authentication " + authResults);
        })
            .on('error', function (error) {
            console.log("[Particle] Error attempting to Authentication + please check your API key");
        });
    };
    Particle.prototype.devices = function () {
        var url = "https://api.particle.io/v1/devices/";
        this.authenticate(url);
    };
    return Particle;
}());
exports.Particle = Particle;
