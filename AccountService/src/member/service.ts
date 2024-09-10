import { BrowserHistoryEntry, Member } from '.';
import { MemberInput } from '.';
import { pool } from '../db';
import { AccountService } from '../auth/service';
import { Role } from '.';
import { MemberInfo } from '.';
import { UUID } from '../types/express';

export class MemberService {
  // checks if member existing from email before creating account
  private async find(memberinput: MemberInput): Promise<boolean> {
    let select =
      ` SELECT jsonb_build_object('id', id, 'name', data->>'name', 'role', data->>'role')` +
      ` AS account FROM account` +
      ` WHERE data->>'email' = $1 AND data->>'role' = $2`;
    const query = {
      text: select,
      values: [memberinput.email, memberinput.role],
    };
    const { rows } = await pool.query(query);
    return rows.length === 1 ? true : false;
  }

  // creates account, takes in a role (shopper or vendor)
  public async create(memberinput: MemberInput): Promise<Member | undefined> {
    const exists = await this.find(memberinput);
    if (exists) {
      // if account already exists
      return undefined;
    }

    let insert = `INSERT INTO account(data) VALUES (
        jsonb_build_object(
          'email', $1::varchar,
          'name', $2::varchar,
          'pwhash', crypt($3::varchar,'87'),
          'role', $4::varchar,
          'address', '1156 High St, Santa Cruz, CA 95064'
        )::jsonb
      )
      RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role, data->>'address' as address`;

    if (memberinput.role == 'vendor') {
      insert = `INSERT INTO account(data) VALUES (
        jsonb_build_object(
          'email', $1::varchar,
          'name', $2::varchar,
          'pwhash', crypt($3::varchar,'87'),
          'role', $4::varchar,
          'status', FALSE
        )::jsonb
      )
      RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role`;
    }

    const query = {
      text: insert,
      values: [memberinput.email, memberinput.name, memberinput.password, memberinput.role],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  /**
   * Retrieves the approval status of a vendor account.
   *
   * This method first checks the role of the account associated with the provided access token.
   * If the role is not 'vendor', it returns false.
   * If the role is 'vendor', it queries the database for the status of the account and returns it.
   *
   * @param {string} id - The id of the account.
   * @returns {Promise<boolean>} - A promise that resolves to the status of the account if it's a vendor account, or false otherwise.
   */
  public async vendorStatus(id: string): Promise<boolean> {
    let select = ` SELECT data->>'status' as status FROM account` + ` WHERE id = $1`;

    const query = {
      text: select,
      values: [`${id}`],
    };

    const { rows } = await pool.query(query);

    if (rows.length !== 1 || rows[0].status === 'false') {
      return false;
    } else {
      return true;
    }
  }

  public async approveVendor(id: string): Promise<Member | undefined> {
    let update =
      `UPDATE account SET data = jsonb_set(data, '{status}', '"true"')` +
      ` WHERE id = $1` +
      ` RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role`;

    const query = {
      text: update,
      values: [`${id}`],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  /**
   * This function retrieves all unapproved vendors from the database.
   *
   * @returns A promise that resolves to an array of Member objects representing unapproved vendors, or undefined if no unapproved vendors are found.
   */
  public async unapprovedVendors(): Promise<Member[] | undefined> {
    let select =
      ` SELECT id, data->>'name' as name, data->>'email' as email, data->>'role' as role` +
      ` FROM account` +
      ` WHERE data->>'role' = 'vendor' AND data->>'status' = 'false'`;

    const query = {
      text: select,
    };

    const { rows } = await pool.query(query);
    return rows;
  }

  public async getInfo(memberId: string): Promise<MemberInfo | undefined> {
    const returnObj = {
      name: '',
      address: '',
    };
    let select = `SELECT jsonb_build_object('name',  data->>'name', 'address', data->>'address') 
    AS accountInfo FROM account 
    WHERE id = $1`;
    const query = {
      text: select,
      values: [memberId],
    };
    const { rows } = await pool.query(query);
    returnObj.name = rows[0].accountinfo.name;
    returnObj.address = rows[0].accountinfo.address;
    return returnObj;
  }


  // gets the 4 most recent products viewed by user
  public async getBrowserHistory(memberId: UUID, size: number, page: number): Promise<BrowserHistoryEntry[] | undefined> {
    try {
      let select = `SELECT * FROM history WHERE account_id = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3`;
      const query = {
        text: select,
        values: [memberId, size, `${page * size}`]
      };
      const {rows} = await pool.query(query);
      return rows;
    } catch(e) {
      console.error(e);
      return undefined;
    }

  }

  // adds product id to browsing history
  public async addBrowserHistory(memberId: UUID, productId: UUID): Promise<boolean> {
    try {
      let insert = `INSERT INTO history (account_id, product_id) VALUES ($1, $2) RETURNING *`;
      const query = {
        text: insert,
        values: [memberId, productId]
      };
      const {rows} = await pool.query(query);
      if (rows[0]) {
        return true;
      } else {
        return false;
      }
    } catch(e) {
      console.error(e);
      return false;
    }
    
  }

  // deletes browser history based on timestamp
  public async deleteBrowserHistory(memberId: UUID, date: Date): Promise<BrowserHistoryEntry[]> {
    const select = `DELETE FROM history WHERE account_id = $1 AND timestamp <= $2 RETURNING *`;
    const query = {
      text: select,
      values: [memberId, date.toISOString()]
    }
    const {rows} = await pool.query(query);
    return rows;
  }
}
