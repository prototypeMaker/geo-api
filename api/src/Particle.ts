import * as https from 'https';
import pino from 'pino';

const logger = pino({
  level: 'trace',
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
    ignore: 'pid,hostname'
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
    const options: https.RequestOptions = {
      hostname: 'api.particle.io',
      timeout: 10000,
      path: `/v1/devices?access_token=${token}`
    };

    https
      .request(options, res => {
        let authResults = '';
        res.statusCode == 200
          ? (authResults = 'success')
          : (authResults = 'failed');

        logger.debug(
          `[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`
        );
      })
      .on('connect', response => {
        logger.debug(`[Particle] ${response}`);
      })
      .on('error', response => {
        logger.error(`[Particle] ${response}`);
      });
  }

  devices() {
    var url = `https://api.particle.io/v1/devices/`;
    this.authenticate(url);
  }
}
