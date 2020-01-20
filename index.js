const https = require('https');
const express = require('express');
let app = express();

let port = process.env.PORT || '4202';
let host = process.env.HOST || 'http://localhost';

app.listen(port, error => {
  console.log(`[SERVER] Live on ${host}:${port}`);
  RecieveJson();
  if (error) throw new Error(error);
});

app.use(express.static('.'));

function domainUpdate() {
  console.log(`[SERVER] Posting to Google's Servers...`);
  let username = process.env.USERNAME;
  let password = process.env.PASSWORD;
  let hostname = process.env.HOSTNAME;

  if (!username || !password || !hostname)
    throw new Error('Missing authentication input required');

  let url = `https://${username}:${password}@domains.google.com/nic/update?hostname=${hostname}`;

  const req = https
    .request(url, res => {
      console.log(`status - ${res.statusCode}`);
      console.log(`output - ${res.complete}`);
    })
    .on('error', error => {
      if (error) throw new Error(error);
    })
    .on('data', d => {
      console.log(d);
    });

  req.end();
}

function RecieveJson()
{
  let IP =  `127.0.0.1`
  let IPSTACK_ACCESSKEY = process.env.IPSTACK_ACCESSKEY;
  let url = `http://api.ipstack.com/${IP}?access_key=${IPSTACK_ACCESSKEY}`
}

module.exports = app;


// Reference 
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style


