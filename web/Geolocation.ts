const http = require("http");
const FS = require("fs");

export class GeoLocation {
  private token: string | undefined;
  private ip: string;
  private geoIp: any;

  /**
   * @constructor Constructs instance of a device's GeoLocation information
   * @param {string} ip - The IP address of the given device
   * @param {string} token - The bearer token for authorization
   */
  constructor(ip: string, token: string) {
    this.token = token || process.env.IPSTACK_ACCESSKEY;
    this.ip = ip || `66.115.169.224`; //test IP
    this.geoIp = null;

    console.timeStamp("Starting GeoLocation api");

    this._updateLocation();
  }

  getLat(): number {
    console.timeStamp(`Get Lat: ${this.geoIp.latitude}`);
    return this.geoIp.latitude;
  }

  getLong(): number {
    console.log(`Get Longitude: ${this.geoIp.longitude}`);
    return this.geoIp.longitude;
  }

  setAPIJson(newValue: string) {
    this.geoIp = newValue;
  }

  getGeoIp(): number {
    return this.geoIp;
  }

  /**
   * Sends HTML request to ipstack.com & saves payload to `this.setAPIJson()`
   */
  _updateLocation = async () => {
    var returnValue = "";

    http.get(
      {
        hostname: "api.ipstack.com",
        port: 80,
        path: `/${this.ip}?access_key=${this.token}`,
        agent: false,
      },
      (res: any) => {
        res.on("data", (data: any) => {
          returnValue += data;
        });

        res.on("end", () => {
          returnValue = JSON.parse(returnValue.toString());
          this.setAPIJson(returnValue);
        });
        res.on("error", (err: any) => {
          if (err)
            throw new Error(`[Console] Unable to receive resource: -- ${err}`);
        });
      }
    );
  };
}
