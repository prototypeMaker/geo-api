"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var request_1 = __importDefault(require("request"));
var host = process.env.HOSTNAME;
var port = process.env.PORT;
var url = "http://" + host + ":" + port;
describe('GET /', function () {
    it('should return coordinates', function (done) {
        var response = {
            items: {
                latitude: 36.214151845703125,
                longitude: -81.67890930175781
            }
        };
        var stringy = JSON.stringify(response);
        console.log(host);
        console.log(port);
        console.log(url);
        request_1.default(url, function (error, response, body) {
            chai_1.default.expect(body).to.equal(stringy);
            done();
        });
    });
});
