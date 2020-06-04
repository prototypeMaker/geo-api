import https from 'https';
import bent, { RequestFunction, Json } from 'bent';
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
  private token: string = process.env.TKNParticle || '';
  private getJSON: RequestFunction<Json> = bent('json');

  constructor(_$deviceID?: string) {
    const hostname = `https://api.particle.io/v1/devices`;

    this.authenticate(hostname);
    this.devices(hostname);
  }

  async authenticate(hostname: string) {
    const options: string = `${hostname}?access_token=${this.token}`;
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

  async devices(hostname: string) {
    const url = `${hostname}/?access_token=${this.token}`;

    return await this.getJSON(`${url}`);
  }

  async deviceIP(hostname: string, $id: string) {
    const url = `${hostname}/${$id}/?access_token=${this.token}`;

    const json = await this.getJSON(url);

    return json[0].last_ip_address;
  }
}
