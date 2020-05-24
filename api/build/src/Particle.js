"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
var https_1 = __importDefault(require("https"));
var Particle = /** @class */ (function () {
    function Particle(_$deviceID) {
        this.token = process.env.TKNParticle;
        this.url = "https://api.particle.io/v1/devices";
        this.authenticate();
        this.devices();
    }
    Particle.prototype.authenticate = function ($url) {
        var options = this.url + "?access_token=" + this.token;
        https_1.default
            .get(options, function (res) {
            var authResults = res.statusCode == 200 ? (authResults = 'success') : (authResults = 'failed');
            console.log("[Particle] HTTP " + res.statusCode + ": Authentication " + authResults);
        })
            .on('error', function (error) {
            console.log("[Particle] Error attempting to authenticate url \"" + options + "\" \n " + error);
        });
    };
    Particle.prototype.devices = function () {
        var url = this.url + "/?access_token=" + this.token;
        https_1.default.get(url, function (res) { res.read(); });
    };
    return Particle;
}());
exports.Particle = Particle;
