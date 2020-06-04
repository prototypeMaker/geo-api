import * as https from 'https';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'trace',
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
    const options = `https://api.particle.io/v1/devices?access_token=${token}`;

    const req = https.get(options, res => {
      res.on('data', d => {
        logger.debug(
          `[services/Particle] ${res.statusCode}: ${res.statusMessage}`
        );
        logger.trace(`[services/Particle] ${d.toString()}`);
      });
    });

    req.on('error', e => {
      logger.error(`[server/Particle] ${e}`);
    });

    req.end();
  }

  devices() {
    var url = `https://api.particle.io/v1/devices/`;
    this.authenticate(url);
  }
}
