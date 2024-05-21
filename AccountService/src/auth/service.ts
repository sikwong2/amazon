import * as jwt from "jsonwebtoken";
import { Authenticated, Credentials, SessionUser } from '.';
import { pool } from '../db'

interface Account {
  id: string,
  name: string,
  role: string
}

export class AccountService {
  private async find(creds: Credentials): Promise<Account | undefined> {
    let select =
      ` SELECT jsonb_build_object('id', id, 'name', data->>'name', 'role', data->>'role')` +
      ` AS account FROM account` +
      ` WHERE data->>'email' = $1` +
      ` AND data->>'pwhash' = crypt($2,'87')`
    const query = {
      text: select,
      values: [creds.email, creds.password],
    };
    const { rows } = await pool.query(query)
    return rows.length === 1 ? rows[0].account : undefined
  }

  public async login(credentials: Credentials): Promise<Authenticated | undefined> {
    const account = await this.find(credentials);
    if (account) {
      const accessToken = jwt.sign(
        { id: account.id, role: account.role },
        `${process.env.MASTER_SECRET}`, {
        expiresIn: '30m',
        algorithm: 'HS256'
      });
      return { id: account.id, name: account.name, role: account.role, accessToken: accessToken };
    } else {
      return undefined;
    }
  }

  public async check(accessToken: string): Promise<SessionUser|undefined>  {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(accessToken,
          `${process.env.MASTER_SECRET}`,
          (err: jwt.VerifyErrors | null, decoded?: object | string) => {
            if (err) {
              resolve(undefined);
            } 
            const account = decoded as Account
            resolve({ id: account.id, role: account.role });
          });
      } catch (e) {
        resolve(undefined);
      }
    });
  }
}