import { GeoLocation } from './Geolocation';
import express from 'express';
import { Particle } from './Particle';

const app = express();

const port = process.env.PORT || 4202;
const host =
  process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';

const pi = new GeoLocation('38.132.156.175');
const device = new Particle();

// Grabs GeoIP
setTimeout(() => {
  // console.log(`${JSON.stringify(pi.getGeoIp(), null, 4)}`);
}, 5000);

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}..`);
});

// Allows CORS. To be replaced by proper package or possibly authentication system?
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // having a wildcard here potientially gives a security risk?
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  
  const response = {
    items: {
      latitude: 36.214151845703125,
      longitude: -81.67890930175781
    }
  };

  res.send(JSON.stringify(response));
});

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
