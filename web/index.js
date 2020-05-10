const https = require('https');
const express = require('express');
const Geolocation = require('../Geolocation');
let app = express();

let port = process.env.PORT || '4202';
let host = process.env.HOST || 'http://localhost';

// let Pi = new Geolocation('152.10.249.31');

// Grabs GeoIP
// setTimeout(() => {
//   console.log(`${JSON.stringify(Pi.getGeoIP(), null, 4)}`)
// }, 5000);


app.listen(port, error => {
  console.log(`[SERVER] Live on ${host}:${port}`);
  if (error) throw new Error(`[Console] Error on \n*******\n`);
});

app.get('/', (req, res) => { res.status('200'); res.end('ok')});

// render files
app.use(express.static('.'));



module.exports = app;


// Reference 
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style


