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
    function Particle() {
        // noargs constructor with defaults
        this.$token = process.env.TKNParticle;
        // this.$token = "potatoe";
        this.Authentication(this.$token);
    }
    Particle.prototype.Authentication = function ($token) {
        var options = "https://api.particle.io/v1/devices?access_token=" + this.$token;
        https
            .request(options, function (res) {
            var authResults = "none";
            res.statusCode == 200 ? authResults = "success" : authResults = "failed";
            console.log("[Particle] HTTP " + res.statusCode + ": Authentication " + authResults);
        })
            .on("error", function (error) { console.log("[Particle] Error attempting to Authentication + please check your API key"); })
            .end("[API] Successfully Authorized");
    };
    return Particle;
}());
exports.Particle = Particle;
