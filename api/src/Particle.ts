import https from 'https';
import bent from 'bent';
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
  private hostname = `https://api.particle.io/v1/devices`;
  private token = process.env.TKNParticle || '';

  constructor() {
    this.authenticate();
    this.devices();
  }

  async authenticate() {
    const options: string = `${this.hostname}?access_token=${this.token}`;
    const req = https
      .get(options, res => {
        var authResults: string =
          res.statusCode == 200
            ? (authResults = 'success')
            : (authResults = 'failed');
        logger.debug(
          `[services/Particle] ${res.statusCode}: ${res.statusMessage}`
        );

        logger.trace(`[services/Particle] ${res.toString()}`);
      })
      .on('error', error => {
        logger.debug(`[services/Particle] ${error.name}: ${error.message}`);

        logger.trace(`[services/Particle] ${error.toString()}`);
      });

    req.on('error', e => {
      logger.error(`[server/Particle] ${e}`);
    });

    req.end();
  }

  async devices() {
    const url = `${this.hostname}/?access_token=${this.token}`;

    const getJSON = bent('json');

    return await getJSON(`${url}`);
  }

  async deviceIP(id: string) {
    const url = `${this.hostname}/${id}/?access_token=${this.token}`;

    const getJSON = bent('json');

    const json = await getJSON(url);

    return json[0].last_ip_address;
  }
}
