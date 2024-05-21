import { Member } from ".";
import { MemberInput } from ".";
import { pool } from "../db";
import { AccountService } from "../auth/service";
import { Role } from ".";

export class MemberService {
  // checks if member existing from email before creating account
  private async find(memberinput: MemberInput): Promise<boolean> {
    let select =
      ` SELECT jsonb_build_object('id', id, 'name', data->>'name', 'role', data->>'role')` +
      ` AS account FROM account` +
      ` WHERE data->>'email' = $1 AND data->>'role' = $2`
    const query = {
      text: select,
      values: [memberinput.email, memberinput.role],
    };
    const { rows } = await pool.query(query)
    return rows.length === 1 ? true : false
  }

  // creates account, takes in a role (shopper or vendor)
  public async create(memberinput: MemberInput): Promise<Member | undefined> {
    const exists = await this.find(memberinput);
    if (exists) { // if account already exists 
      return undefined;
    }

    let insert =
      `INSERT INTO account(data) VALUES (
        jsonb_build_object(
          'email', $1::varchar,
          'name', $2::varchar,
          'pwhash', crypt($3::varchar,'87'),
          'role', $4::varchar
        )::jsonb
      )
      RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role`

    if (memberinput.role == "vendor") {
      insert =
        `INSERT INTO account(data) VALUES (
        jsonb_build_object(
          'email', $1::varchar,
          'name', $2::varchar,
          'pwhash', crypt($3::varchar,'87'),
          'role', $4::varchar,
          'status', FALSE
        )::jsonb
      )
      RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role`
    }

    const query = {
      text: insert,
      values: [memberinput.email, memberinput.name, memberinput.password, memberinput.role]
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
   * @param {string} accessToken - The access token associated with the account.
   * @returns {Promise<boolean>} - A promise that resolves to the status of the account if it's a vendor account, or false otherwise.
   */
  public async vendorStatus(accessToken: string): Promise<boolean> {
    const user = await new AccountService().check(accessToken);

    if (!user) {
      return false
    }

    const {id, role} = user;

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

  public async approveVendor(memberinput: MemberInput): Promise<Member | undefined> {
    const exists = await this.find(memberinput);
    if (!exists) {
      return undefined;
    }

    let update =
      `UPDATE account SET data = jsonb_set(data, '{status}', '"true"')` +
      ` WHERE data->>'email' = $1 AND data->>'role' = $2` +
      ` RETURNING id, data->>'name' as name, data->>'email' as email, data->>'role' as role`

    const query = {
      text: update,
      values: [memberinput.email, memberinput.role]
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async unapprovedVendors(accessToken: string): Promise<Member[] | undefined> {
    const user = await new AccountService().check(accessToken);

    if (!user) {
      return undefined
    }

    const {id, role} = user;

    if (role !== 'shopper') {
      return undefined;
    }

    let select =
      ` SELECT id, data->>'name' as name, data->>'email' as email, data->>'role' as role` +
      ` FROM account` +
      ` WHERE data->>'role' = 'vendor' AND data->>'status' = 'false'`

    const query = {
      text: select,
    };

    const { rows } = await pool.query(query);
    return rows;
  }

}