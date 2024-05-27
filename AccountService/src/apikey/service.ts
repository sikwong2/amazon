import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { APIKey } from '.';
import { pool } from '../db';

export class APIKeyService {
  public async getAllKeys(): Promise<APIKey[]> {
    let select = `SELECT account_id, api_key, active FROM apikeytable ORDER BY api_key ASC`;

    const query = {
      text: select,
    };

    const { rows } = await pool.query(query);
    console.log(rows);
    return rows;
  }

  public async getVendorKeys(id: string): Promise<APIKey[]> {
    let select = ` SELECT account_id, api_key, active FROM apikeytable WHERE account_id = $1`;

    const query = {
      text: select,
      values: [`${id}`],
    };

    const { rows } = await pool.query(query);

    console.log(rows);

    return rows;
  }

  public async createAPIKey(id: string): Promise<APIKey> {
    const key = jwt.sign(
      { uuid: uuidv4(), account_id: id },
      `${process.env.MASTER_SECRET}`,
      {
        algorithm: 'HS256',
      },
    );

    let insert =
      ` INSERT INTO apikeytable (account_id, api_key, active)` +
      ` VALUES ($1, $2, true) RETURNING account_id, api_key, active`;

    const query = {
      text: insert,
      values: [`${id}`, key],
    };

    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async activateAPIKey(key: string): Promise<Boolean> {
    let update = ` UPDATE apikeytable SET active = true WHERE api_key = $1 RETURNING active`;

    const query = {
      text: update,
      values: [`${key}`],
    };

    const { rows } = await pool.query(query);
    return rows[0].active;
  }

  public async deactivateAPIKey(key: string): Promise<Boolean> {
    let update = ` UPDATE apikeytable SET active = false WHERE api_key = $1 RETURNING active`;

    const query = {
      text: update,
      values: [`${key}`],
    };

    const { rows } = await pool.query(query);
    return rows[0].active;
  }
}
