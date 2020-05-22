import express from 'express';
import pino from 'pino';
import { GeoLocation } from './Geolocation';
import { Particle } from './Particle';

const app = express();

const logger = pino({
  level: 'fatal',
  prettyPrint: {
    levelFirst: true,
    translateTime: true
  }
});

const port = process.env.PORT || 4202;
const host =
  process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';

const pi = new GeoLocation('10.240.29.204');
const device = new Particle();

app.listen(port, () => {
  logger.info(`Listening on ${host}:${port}...`);
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

  logger.debug(`GET ${req.path}`);

  res.send(JSON.stringify(response));
});

process.on('uncaughtException', err => {
  logger.error(err);
  process.exit(1);
});

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
