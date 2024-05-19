import { Credentials, Authenticated } from './schema';
import { SessionUser } from '../../types/next';
import dotenv from 'dotenv';
dotenv.config({path : '../.env'});

export class AuthService {
  public async login(credentials: Credentials): Promise<Authenticated>  {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/authenticate`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw res
          }
          return res.json()
        })
        .then((authenticated) => {
          resolve(authenticated)
        })
        .catch((err) => {
          console.log(err)
          reject(new Error("Unauthorised"))
        });
    });
  }

  public async check(authHeader?: string, roles?: string[]): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorised"))
      }
      else {
        const tokens = authHeader.split(' ');
        if (tokens.length != 2 || tokens[0] !== 'Bearer') {
          reject(new Error("Unauthorised"))
        }
        else {
          fetch(`http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/authenticate?accessToken=` + tokens[1], {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              return res.json();
            })
            .then((sessionUser) => {
              console.log(sessionUser);
              if (roles){
                if (!roles.includes(sessionUser.role)) {
                  reject(new Error("Unauthorised"))
                }
              }
              resolve({id: sessionUser.id});
            })
            .catch((err) => {
              console.log(err)
              reject(new Error("Unauthorised"))
            });
        }
      }
    });
  }
}
