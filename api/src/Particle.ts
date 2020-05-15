import * as https from 'https';
import { stringify } from 'querystring';
import { Url } from 'url';

export class Particle
{
    private $token: string | undefined;
    constructor()
    {
        // noargs constructor with defaults
        this.$token = process.env.TKNParticle;
        this.Authentication(this.$token);
    }

     Authentication($token: string | undefined)
     {
         const options: string =  `https://api.particle.io/v1/devices?access_token=${this.$token}`;
         https
         .request(options, (res) => { 
            let authResults = "none";
            res.statusCode == 200 ? authResults = "success" : authResults = "failed"; 
            console.log(`[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`); 
        })
         .on("error", (error) => {console.log(`[Particle] Error attempting to Authentication + please check your API key`)})
         .end("[API] Successfully Authorized");   
    }

    

}