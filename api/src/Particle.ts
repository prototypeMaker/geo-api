import https from 'https';
import { stringify } from 'querystring';
import { Url } from 'url';
import { IncomingMessage } from 'http';
const bent = require('bent');

export class Particle {
  private url: string;
  private token = process.env.TKNParticle;
  constructor();
  constructor(_$deviceID?: string) {
    this.url =`https://api.particle.io/v1/devices`;
    this.authenticate();
    this.devices();
  }

  async authenticate($url?: string) {
    const options: string = `${this.url}?access_token=${this.token}`;
    https
      .get(options, (res) => {
        var authResults: string = res.statusCode == 200 ? (authResults = 'success') : (authResults = 'failed');
        console.log(`[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`);

      })
      .on('error', error => {
        console.log(
          `[Particle] Error attempting to authenticate url "${options}" \n ${error}`
        );
      });
  }

  async devices() {
    const getJSON = bent('json')  
    var url = `${this.url}/?access_token=${this.token}`
    var returnValue;
    var devices = await getJSON(`${url}`);
    
    // returns array of devices 
    return returnValue;
  }
 
  async deviceIP($id: string)
 {
  const getJSON = bent('json');  
  var url = `${this.url}/${$id}/?access_token=${this.token}`
  var devices = await getJSON(url);
  return devices[0].last_ip_address;
 }
}