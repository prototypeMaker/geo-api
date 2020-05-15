import * as https from 'https';

export class Particle {
  constructor() {
    // noargs constructor with defaults
    const $token = process.env.TKNParticle;
    this.Authentication($token);
  }

  Authentication($token: string | undefined) {
    const options: string = `https://api.particle.io/v1/devices?access_token=${$token}`;
    https
      .request(options, res => {
        let authResults = 'none';
        res.statusCode == 200
          ? (authResults = 'success')
          : (authResults = 'failed');
        console.log(
          `[Particle] HTTP ${res.statusCode}: Authentication ${authResults}`
        );
      })
      .on('error', error => {
        console.log(
          `[Particle] Error attempting to Authentication + please check your API key`
        );
      })
      .end('[API] Successfully Authorized');
  }
}
