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
      return { id: account.id, name: account.name, accessToken: accessToken };
    } else {
      return undefined;
    }
  }

  public async check(accessToken: string): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(accessToken,
          `${process.env.MASTER_SECRET}`,
          (err: jwt.VerifyErrors | null, decoded?: object | string) => {
            if (err) {
              reject(err);
            }
            const account = decoded as Account
            resolve({ id: account.id, role: account.role });
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Retrieves the approval status of a vendor account.
   *
   * This method first checks the role of the account associated with the provided access token.
   * If the role is not 'vendor', it returns false.
   * If the role is 'vendor', it queries the database for the status of the account and returns it.
   *
   * @param {string} accessToken - The access token associated with the account.
   * @returns {Promise<boolean>} - A promise that resolves to the status of the account if it's a vendor account, or false otherwise.
   */
  public async vendorStatus(accessToken: string): Promise<boolean> {
    const { id, role } = await this.check(accessToken);

    if (role !== 'vendor') {
      return false;
    }

    let select =
      ` SELECT data->>'status' as status FROM account` +
      ` WHERE id = $1`

    const query = {
      text: select,
      values: [`${id}`],
    };

    const { rows } = await pool.query(query);

    if (rows.length !== 1) {
      return false;
    }

    console.log(rows[0].status);

    if (rows[0].status === 'true') {
      return true;
    } else {
      return false;
    }

  }
}