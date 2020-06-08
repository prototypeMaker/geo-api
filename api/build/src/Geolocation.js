"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var http = __importStar(require("http"));
var pino_1 = __importDefault(require("pino"));
var logger = pino_1.default({
    level: process.env.LOG_LEVEL || 'trace',
    prettyPrint: {
        levelFirst: true,
        translateTime: true,
        ignore: 'pid,hostname'
    }
});
var GeoLocation = /** @class */ (function () {
    /**
     * @constructor Constructs instance of a device's GeoLocation information
     * @param {string} ip - The IP address of the given device
     * @param {string} token - The bearer token for authorization
     */
    function GeoLocation(ip) {
        var _this = this;
        this.token = '';
        this.ip = '';
        this.geoIp = null;
        /**
         * Sends HTML request to ipstack.com & saves payload to `this.setAPIJson()`
         */
        this.updateLocation = function () { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, options, req;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = '';
                        options = {
                            hostname: 'api.ipstack.com',
                            port: 80,
                            path: "/" + this.ip + "?access_key=" + this.token,
                            agent: false
                        };
                        return [4 /*yield*/, http.get(options, function (res) {
                                res.on('data', function (data) {
                                    var parsed = JSON.parse(data);
                                    if (parsed.success != undefined && parsed.success == false) {
                                        switch (parsed.error.code) {
                                            case 101:
                                                logger.error("[server/Geolocation] " + parsed.error.type + ": " + parsed.error.info);
                                        }
                                    }
                                    logger.debug("[services/Geolocation] " + res.statusCode + ": " + res.statusMessage);
                                    logger.trace('[services/Geolocation] %O', parsed);
                                    returnValue += data;
                                });
                                res.on('end', function () {
                                    returnValue = JSON.parse(returnValue.toString());
                                    _this.setAPIJson(returnValue);
                                });
                            })];
                    case 1:
                        req = _a.sent();
                        req.on('error', function (e) {
                            logger.error("[server/Geolocation] %O", e);
                        });
                        req.end();
                        return [2 /*return*/];
                }
            });
        }); };
        this.token = process.env.IPSTACK_ACCESSKEY || '';
        this.ip = ip || "66.115.169.224"; //test IP
        this.updateLocation();
    }
    Object.defineProperty(GeoLocation.prototype, "location", {
        get: function () {
            var x = {
                latitude: 0,
                longitude: 0
            };
            x.latitude = this.latitude;
            x.longitude = this.longitude;
            return x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeoLocation.prototype, "latitude", {
        get: function () {
            logger.trace("[services/Geolocation]: Getting " + this.ip + "'s latitude: " + this.geoIp.latitude);
            return this.geoIp.latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeoLocation.prototype, "longitude", {
        get: function () {
            logger.trace("[services/Geolocation]: Getting " + this.ip + "'s longitude: " + this.geoIp.longitude);
            return this.geoIp.longitude;
        },
        enumerable: true,
        configurable: true
    });
    GeoLocation.prototype.setAPIJson = function (newValue) {
        this.geoIp = newValue;
    };
    Object.defineProperty(GeoLocation.prototype, "geoLocation", {
        get: function () {
            return this.geoIp;
        },
        set: function (ip) {
            this.ip = ip;
            this.updateLocation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeoLocation.prototype, "deviceIp", {
        /**
         * Assigns the GeoLocation api a new IP and updates the location
         */
        set: function (ip) {
            this.ip = ip;
            this.updateLocation();
        },
        enumerable: true,
        configurable: true
    });
    return GeoLocation;
}());
exports.GeoLocation = GeoLocation;
