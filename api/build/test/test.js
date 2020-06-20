"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var request_1 = __importDefault(require("request"));
var host = process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';
var port = process.env.PORT || 4202;
var url = host + ":" + port;
describe('GET /', function () {
    it('should return coordinates', function (done) {
        request_1.default(url, function (error, response, body) {
            chai_1.default.expect(body).to.not.be.null;
            chai_1.default.expect(error).to.be.null;
            done();
        });
    });
});
