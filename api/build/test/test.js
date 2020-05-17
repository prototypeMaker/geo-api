"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var request_1 = __importDefault(require("request"));
describe('GET /', function () {
    it('should return coordinates', function (done) {
        var response = {
            items: {
                latitude: 36.214151845703125,
                longitude: -81.67890930175781
            }
        };
        var stringy = JSON.stringify(response);
        request_1.default('http://ec2-35-170-243-209.compute-1.amazonaws.com:4202/', function (error, response, body) {
            chai_1.default.expect(body).to.equal(stringy);
            done();
        });
    });
});
