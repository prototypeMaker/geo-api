const https = require('https');
const express = require('express');
const Geolocation = require('./Geolocation');
let app = express();

let port = process.env.PORT || '4202';
let host = process.env.HOST || 'http://localhost';

app.listen(port, error => {
  console.log(`[SERVER] Live on ${host}:${port}`);
  if (error) throw new Error(error);
});

app.use(express.static('.'));

let Pi = new Geolocation();
console.log(Pi.Payload)

module.exports = app;


// Reference 
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style


