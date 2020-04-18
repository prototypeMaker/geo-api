// Import Statements
const http = require('http');
const FS = require('fs');


// Class Declaration
class GeoLocation
{
    
    constructor(ip, token)
    {
        this.token = token || process.env.IPSTACK_ACCESSKEY;
        this.ip  = ip || `66.115.169.224`; //test IP
        this.GeoIP = null;
        console.timeStamp("Starting Gelolocatoin api")
        this._updateLocation();

    }
    getLat() 
    {
        console.timeStamp(`Get Lat: ${this.GeoIP.latitude}`)
        return this.GeoIP.latitude;
    }
    
    getLong()
    {
        console.log(`Get Longitude: ${this.GeoIP.longitude}`)
        return this.GeoIP.longitude;
    }

    setLat()
    {
        
    }

    setAPIJson(newValue)
    {
        this.GeoIP = newValue;
    }

    getGeoIP()
    {
        return this.GeoIP;
    }

    // Sends HTML req to ipstack.com & saves payload to 'this.setAPIJson()'
    _updateLocation = async () => 
    {
        var returnValue = new String();

            http.get(
                {
                    hostname: 'api.ipstack.com',
                    port: 80,
                    path: `/${this.ip}?access_key=${this.token}`,
                    agent: false  
                }, (res) => 
                {
                    res.on('data', data => { returnValue += data })
    
                    res.on('end', () => {
                        returnValue = JSON.parse(returnValue, null, 4);
                        this.setAPIJson(returnValue);
                    })
                    res.on('error', (err) => { if (err) throw new Error(`[Console] Unable to recieve resource: -- ${err}`); callback(null, err);})
                })
            
    }
}
module.exports = GeoLocation;
