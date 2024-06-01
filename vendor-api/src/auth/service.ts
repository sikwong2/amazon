import { SessionUser } from '../types';

export class AuthService {
  public async check(authHeader?: string, scopes?: string[]): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error('Unauthorised'));
      } else {
        const tokens = authHeader.split(' ');
        if (tokens.length != 2 || tokens[0] !== 'Bearer') {
          reject(new Error('Unauthorised'));
        } else {
          fetch(
            `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/checkkey?key=` +
              tokens[1],
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
            .then((res) => {              
              if (!res.ok) {
                throw res;
              }

              return res.json();
            })
            .then((sessionUser) => {

              console.log('sessionUser = ', sessionUser);
              
              resolve({ id: sessionUser.id });
            })
            .catch((err) => {
              console.log(err);
              reject(new Error('Unauthorised'));
            });
        }
      }
    });
  }

}