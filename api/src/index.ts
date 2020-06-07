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

const geoLocation = new GeoLocation();
const particle = new Particle();

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
  const devices = particle.getAllDevices().then(response => response);

  const deviceLocations: Promise<Device[]> = devices.then(response => {
    let devices: Device[] = [];

    response.forEach((element: any) => {
      const { id, last_ip_address } = element;

      geoLocation.setIp(last_ip_address);

      geoLocation.updateLocation();

      const loc = geoLocation.getLocation();

      const location = {
        latitude: loc.longitude,
        longitude: loc.latitude
      };

      devices.push({
        id,
        location
      });
    });

    return devices;
  });

  logger.debug(`[app] GET ${req.path}`);

  deviceLocations.then(locations => {
    const body = { items: locations[0].location };
    res.send(JSON.stringify(body)); // works for one device for now
  });
});

process.on('uncaughtException', e => {
  logger.fatal(`[app] ${e}`);
  process.exit(1);
});

module.exports = app;

interface Device {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
