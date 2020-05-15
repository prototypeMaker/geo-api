// import { GeoLocation } from './Geolocation';
import * as http from 'http';
import { GeoLocation } from './Geolocation';
const express = require('express');
import { Particle } from './Particle';
// const Particle = require('./Particle');

// const app = express();
const app = express();

const port = process.env.PORT || 4202;
const host = process.env.HOST || 'http://localhost';

const pi = new GeoLocation('10.240.29.204');
const device = new Particle();

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}..`);
});

app.get('/', (req: http.IncomingMessage, res: http.IncomingMessage) => {
  console.log('Success');
});

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
