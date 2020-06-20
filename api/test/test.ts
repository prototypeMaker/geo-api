import chai from 'chai';
import request from 'request';
import { json } from 'express';

const host =
  process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';
const port = process.env.PORT || 4202;
const url = `${host}:${port}`;

describe('GET /', () => {
  it('should return coordinates', done => {
    request(url, (error, response, body) => {
      chai.expect(body).to.not.be.null;
      chai.expect(error).to.be.null;
      done();
    });
  });
});
