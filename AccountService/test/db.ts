import { Pool } from 'pg';
import * as fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();
process.env.POSTGRES_DB = 'test';

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'test',
  user: 'postgres',
  password: 'postgres',
});

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(/\r?\n/);
  for (const statement of statements) {
    if (statement) {
      await pool.query(statement);
    }
  }
};

const reset = async () => {
  await run('sql/schema.sql');
  await run('sql/test.sql');
};

const shutdown = () => {
  pool.end(() => {
    // console.log('pool has ended');
  });
};

export { reset, shutdown };
