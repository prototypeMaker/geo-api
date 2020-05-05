const https = require("https");
const express = require("express");
const Geolocation = require("./Geolocation");
let app = express();

let port = process.env.PORT || 4202;
let host = process.env.HOST || "http://localhost";

let pi = new Geolocation("152.10.249.31", "d7b3fca89ad66271efaa93d4d483939d");

// Grabs GeoIP
setTimeout(() => {
  console.log(`${JSON.stringify(pi.getGeoIP(), null, 4)}`);
}, 5000);

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}...`);
});

// app.listen((port: string, error: Error) => {
//   console.log(port);

//   console.log(`[SERVER] Live on ${host}:${4202}`);
//   if (error) throw error;
// });

// render files
app.use(express.static("."));

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
