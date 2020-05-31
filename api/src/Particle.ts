import https from 'https';
import { stringify } from 'querystring';
import { Url } from 'url';
import { IncomingMessage } from 'http';
import { json } from 'body-parser';

export class Particle {
  private url: string;
  private token = process.env.TKNParticle;
  constructor();
  constructor(_$deviceID?: string) {
    this.url =`https://api.particle.io/v1/devices`;
    this.authenticate();
    this.devices();
  }

  authenticate($url?: string) {
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

  devices() {
      var url = `${this.url}/?access_token=${this.token}`
      https.get(url, (res: IncomingMessage) => {res.read();});
  }
}
