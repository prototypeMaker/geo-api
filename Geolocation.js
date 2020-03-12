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
        this._updateLocation((error) =>
        {
            if (error)
            {
                return new Error(`[Console] Attempted to Update Location \n*******\n`)
            }
            this.setGeoIP(returnValue);
            this.getGeoIP()
        })


    }
    get getLat() 
    {
        console.timeStamp(`Get Lat: ${this.GeoIP}`)
        return this.GeoIP.latitude;
    }
    
    get getLong()
    {
        console.log(`Get GeoIP: ${this.GeoIP}`)
        return this.GeoIP.longitude;
    }

    setLat()
    {

    }

    setGeoIP(newValue)
    {
        this.GeoIP = newValue;
        console.log(`SetGeoIP: ${this.GeoIP}`)
    }

    getGeoIP()
    {
        return this.GeoIP;
    }
    
    _updateLocation = async (callback) => 
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
                        console.log(returnValue);
                        callback(returnValue, null);
                    })
                    res.on('error', (err) => { if (err) throw new Error(`[Console] Unable to recieve resource: -- ${err}`); callback(null, err);})
                })
            
    }
    

    saveToFile(jsonName, rawData)
    {
        let saveData = JSON.stringify(rawData);
        jsonName = jsonName + ".json";

        console.log(`[Console] saving '${jsonName}' to file\n`);
        FS.writeFileSync(jsonName, saveData);
        console.log(`...[Console] file saved.\n`)
    }
}
module.exports = GeoLocation;
