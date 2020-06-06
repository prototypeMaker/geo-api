import express from 'express';
import pino from 'pino';
import { GeoLocation } from './Geolocation';
import { Particle } from './Particle';

const app = express();

const logger = pino({
  level: process.env.LOG_LEVEL || 'trace',
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
    ignore: 'pid,hostname'
  }
});

const port = process.env.PORT || 4202;
const host =
  process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';

app.listen(port, () => {
  logger.info(`[app] Listening on ${host}:${port}...`);
});

// Allows CORS. To be replaced by proper package or possibly authentication system?
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

  // will web request periodically every few seconds, or the api push the data?

  // const device = new Particle();

  // const ip = device.deviceIP();

  // const pi = new GeoLocation(ip);

  // const location = pi.getLatLong();

  // response.items.latitude = location.latitude;
  // response.items.longitude = location.longitude;

  logger.debug(`[app] GET ${req.path}`);

  res.send(JSON.stringify(response));
});

process.on('uncaughtException', e => {
  logger.fatal(`[app] ${e}`);
  process.exit(1);
});

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
