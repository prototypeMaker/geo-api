const http = require("http");
const FS = require("fs");

class GeoLocation {
  private token: string | undefined;
  private ip: string;
  private GeoIP: any;

  /**
   * @constructor Constructs instance of a device's GeoLocation information
   * @param {string} ip - The IP address of the given device
   * @param {string} token - The bearer token for authorization
   */
  constructor(ip: string, token: string) {
    this.token = token || process.env.IPSTACK_ACCESSKEY;
    this.ip = ip || `66.115.169.224`; //test IP
    this.GeoIP = null;

    console.timeStamp("Starting GeoLocation api");

    this._updateLocation();
  }

  getLat() {
    console.timeStamp(`Get Lat: ${this.GeoIP.latitude}`);
    return this.GeoIP.latitude;
  }

  getLong() {
    console.log(`Get Longitude: ${this.GeoIP.longitude}`);
    return this.GeoIP.longitude;
  }

  setLat() {}

  setAPIJson(newValue: string) {
    this.GeoIP = newValue;
  }

  getGeoIP() {
    return this.GeoIP;
  }

  // Sends HTML req to ipstack.com & saves payload to 'this.setAPIJson()'
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
module.exports = GeoLocation;
