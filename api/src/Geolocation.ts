import * as http from 'http';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'trace',
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
    ignore: 'pid,hostname'
  }
});

export class GeoLocation {
  private token: string | undefined = '';
  private ip: string | undefined = '';
  private geoIp: any = null;

  /**
   * @constructor Constructs instance of a device's GeoLocation information
   * @param {string} ip - The IP address of the given device
   * @param {string} token - The bearer token for authorization
   */
  constructor(ip?: string) {
    this.token = process.env.IPSTACK_ACCESSKEY || '';

    this.ip = ip || `66.115.169.224`; //test IP

    this.updateLocation();
  }

  getLocation(): { latitude: number; longitude: number } {
    const x = {
      latitude: 0,
      longitude: 0
    };

    x.latitude = this.getLat();
    x.longitude = this.getLong();

    return x;
  }

  getLat(): number {
    logger.trace(
      `[services/Geolocation]: Getting ${this.ip}'s latitude: ${this.geoIp.latitude}`
    );
    return this.geoIp.latitude;
  }

  getLong(): number {
    logger.trace(
      `[services/Geolocation]: Getting ${this.ip}'s longitude: ${this.geoIp.longitude}`
    );
    return this.geoIp.longitude;
  }

  setAPIJson(newValue: string) {
    this.geoIp = newValue;
  }

  setIp(ip: string) {
    this.ip = ip;
  }

  getGeoIp(): number {
    return this.geoIp;
  }

  /**
   * Sends HTML request to ipstack.com & saves payload to `this.setAPIJson()`
   */
  updateLocation = async (): Promise<void> => {
    let returnValue = '';

    const options: http.RequestOptions = {
      hostname: 'api.ipstack.com',
      port: 80,
      path: `/${this.ip}?access_key=${this.token}`,
      agent: false
    };

    const req = http.get(options, res => {
      res.on('data', data => {
        const parsed = JSON.parse(data);

        if (parsed.success != undefined && parsed.success == false) {
          switch (parsed.error.code) {
            case 101:
              logger.error(
                `[server/Geolocation] ${parsed.error.type}: ${parsed.error.info}`
              );
          }
        }

        logger.debug(
          `[services/Geolocation] ${res.statusCode}: ${res.statusMessage}`
        );

        logger.trace('[services/Geolocation] %O', parsed);

        returnValue += data;
      });

      res.on('end', () => {
        returnValue = JSON.parse(returnValue.toString());
        this.setAPIJson(returnValue);
      });
    });

    req.on('error', e => {
      logger.error(`[server/Geolocation] ${e}`);
    });

    req.end();
  };
}
