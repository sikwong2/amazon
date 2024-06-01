import { Pool } from 'pg';
import * as fs from 'fs';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (!POSTGRES_HOST) {
  console.error('Error: POSTGRES_HOST is not defined in db.ts AccountService/test.');
  process.exit(1);
}

if (!POSTGRES_PORT) {
  console.error('Error: POSTGRES_ACCOUNT_PORT is not defined in db.ts AccountService/test.');
  process.exit(1);
}

if (!POSTGRES_DB) {
  console.error('Error: POSTGRES_DB is not defined in db.ts AccountService/test.');
  process.exit(1);
}

if (!POSTGRES_USER) {
  console.error('Error: POSTGRES_USER is not defined in db.ts AccountService/test.');
  process.exit(1);
}

if (!POSTGRES_PASSWORD) {
  console.error('Error: POSTGRES_PASSWORD is not defined in db.ts AccountService/test.');
  process.exit(1);
}

const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
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
  await run('sql/data.sql');
};

const shutdown = () => {
  pool.end(() => {
    // console.log('pool has ended');
  });
};

export { reset, shutdown };
