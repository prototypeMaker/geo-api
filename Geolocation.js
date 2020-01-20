// Import Statements
const http = require('http');
const Express = require('express');
const GoogleMaps = require('@google/maps');


// Class Declaration
class GeoLocation
{
    
    constructor(ip, token, )
    {
        this.token = token || process.env.IPSTACK_ACCESSKEY;
        this.ip  = ip || `66.115.169.224`;
        this.Payload = {};
        this._updateLocation((returnValue, error) => {this.Payload = returnValue})
        
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
                res.on('end', () => { callback(JSON.parse(returnValue), null) })
                res.on('error', (err) => { if (err) throw new Error(`[Console] Something Broke -- ${err}`)})
            })

            // return returnValue;
    }
        
    get lat() 
    {
        return this.Payload.latitude;
    }
    
    get long()
    {
        return this.Payload.longitude;
    }

}

module.exports = GeoLocation;