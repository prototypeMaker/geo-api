import chai from 'chai';
import request from 'request';

const host =
  process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';
const port = process.env.PORT || 4202;
const url = `${host}:${port}`;

describe('GET /', () => {
  it('should return coordinates', function(done) {
    const response = {
      items: {
        latitude: 36.214151845703125,
        longitude: -81.67890930175781
      }
    };

    const stringy = JSON.stringify(response);

    request(url, (error, response, body) => {
      chai.expect(body).to.equal(stringy);
      done();
    });
  });
});
