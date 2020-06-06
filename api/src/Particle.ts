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
  constructor(_$deviceID?: string) {
    const hostname = `https://api.particle.io/v1/devices`;
    const token = process.env.TKNParticle || '';

    this.authenticate(hostname, token);
    this.devices(hostname, token);
  }

  async authenticate(hostname: string, token: string) {
    const options: string = `${hostname}?access_token=${token}`;
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

  async devices(hostname: string, token: string) {
    const url = `${hostname}/?access_token=${token}`;

    const getJSON = bent('json');

    return await getJSON(`${url}`);
  }

  async deviceIP(hostname: string, token: string, id?: string) {
    const url = `${hostname}/${id}/?access_token=${token}`;

    const getJSON = bent('json');

    const json = await getJSON(url);

    return json[0].last_ip_address;
  }
}
