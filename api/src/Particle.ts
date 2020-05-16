import * as https from 'https';
import { stringify } from 'querystring';
import { Url } from 'url';
import { IncomingMessage } from 'http';
import { json } from 'body-parser';

export class Particle {
  private url: string;
  constructor();
  constructor($url?: string) {
    this.url = $url || `https://api.particle.io/v1/devices`;
    this.authenticate();
  }

  authenticate($url?: string) {
    const token = process.env.TKNParticle;
    const options: string = `${this.url}?access_token=${token}`;
    https
      .request(options, res => {
        let authResults = 'none';
        res.statusCode == 200
          ? (authResults = 'success')
          : (authResults = 'failed');
        console.log(
          `[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`
        );
      })
      .on('error', error => {
        console.log(
          `[Particle] Error attempting to Authentication + please check your API key`
        );
      });
  }

  devices() {
    var url = `https://api.particle.io/v1/devices/`;
    this.authenticate(url);
  }
}
