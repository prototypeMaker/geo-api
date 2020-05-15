import * as https from 'https';
import { stringify } from 'querystring';
import { Url } from 'url';
import { IncomingMessage } from 'http';

export class Particle
{
    private token: string | undefined;
    private url: string;
    constructor();
    constructor($url?: string, $token?: string)
    {
        this.token = $token || process.env.TKNParticle;
        this.url = $url || `https://api.particle.io/v1/devices`;
        this.Authentication();
    }

     Authentication($url?:string, $token?: string | any)
     {
         const options: string =  `${this.url}?access_token=${this.token}`;
         https
         .request(options, (res) => { 
            let authResults = "none";
            res.statusCode == 200 ? authResults = "success" : authResults = "failed"; 
            console.log(`[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`); 
        })
         .on("error", (error) => {console.log(`[Particle] Error attempting to Authentication + please check your API key`)})
    }

    devices()
    {
        var url = `https://api.particle.io/v1/devices/`
        this.Authentication(url);

    }

}
