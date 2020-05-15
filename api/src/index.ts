import { GeoLocation } from './Geolocation';
import express from 'express';

const app = express();

const port = process.env.PORT || 4202;
const host = process.env.HOST || 'http://localhost';

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}..`);
});

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

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
