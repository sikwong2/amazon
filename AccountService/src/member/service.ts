import { Member } from ".";
import { MemberInput } from ".";
import { pool } from "../db";
import { Role } from ".";

export class MemberService {
  // checks if member existing from email before creating account
  private async find(memberinput: MemberInput): Promise<boolean> {
    let select =
      ` SELECT jsonb_build_object('id', id, 'name', data->>'name', 'role', data->>'role')` +
      ` AS account FROM account` +
      ` WHERE data->>'email' = $1`
    const query = {
      text: select,
      values: [memberinput.email],
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



}