// Import Statements
const http = require('http');
const Express = require('express');
const GoogleMaps = require('@google/maps');

// Class Declaration
class GeoLocation
{
    
    constructor(ip, token, callback )
    {
        this.token = token || process.env.IPSTACK_ACCESSKEY;
        this.ip  = ip || `66.115.169.224`;
        this.Payload = {};
    }

    _updateLocation = async () => 
    {
        const url = `http://api.ipstack.com/${this.IP}?access_key=${this.API}&formate=1`

        useCallback(
            () => {
                callback
            },
            [input],
        )
    }

    get lat() 
    {
        return ;
    }

    get long()
    {
        return ;
    }
}

const Pi = new GeoLocation();
Pi._updateLocation();