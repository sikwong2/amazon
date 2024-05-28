import { Member } from ".";
import { MemberInput } from ".";
import { pool } from "../db";
import { Role } from ".";
import { MemberInfo } from ".";

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
    const {rows} = await pool.query(query)
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
    const query = {
      text: insert,
      values: [memberinput.email, memberinput.name, memberinput.password, memberinput.role]
    };
    const {rows} = await pool.query(query);
    return rows[0];
  }

  public async getInfo (memberId: string): Promise <MemberInfo | undefined> {
    const returnObj = {
      name: '',
      address: ''
    }
    let select = `SELECT jsonb_build_object('name',  data->>'name', 'address', data->>'address') 
    AS accountInfo FROM account 
    WHERE id = $1`;
    const query = {
      text: select,
      values: [memberId],
    };
    const {rows} = await pool.query(query)
    returnObj.name = rows[0].accountinfo.name;
    returnObj.address = rows[0].accountinfo.address;
    return returnObj;
  }
}