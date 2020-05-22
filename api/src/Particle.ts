import * as https from 'https';
import pino from 'pino';

const logger = pino({
  level: 'fatal',
  prettyPrint: {
    levelFirst: true,
    translateTime: true
  }
});

export class Particle {
  private url: string;

  constructor($url?: string) {
    this.url = $url || `https://api.particle.io/v1/devices`;
    this.authenticate();
  }

  private authenticate($url?: string) {
    const token = process.env.TKNParticle;
    const options: string = `${this.url}?access_token=${token}`;
    https
      .request(options, res => {
        console.log('hi');

        let authResults = '';
        res.statusCode == 200
          ? (authResults = 'success')
          : (authResults = 'failed');

        logger.debug(
          `[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`
        );
      })
      .on('error', error => {
        console.log('bye');

        logger.warn(
          `[Particle] Error attempting to Authentication. Error: ${error}`
        );
      });
  }

  devices() {
    var url = `https://api.particle.io/v1/devices/`;
    this.authenticate(url);
  }
}
