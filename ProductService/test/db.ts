import { Pool } from 'pg';
import * as fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const  { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_PRODUCT_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (!POSTGRES_HOST) {
  console.warn('Error: POSTGRES_HOST is not defined in db.ts ProductService/test.');
}

if (!POSTGRES_PORT) {
  console.warn('Error: POSTGRES_PORT is not defined in db.ts ProductService/test.');
}

if (!POSTGRES_PRODUCT_DATABASE) {
  console.warn('Error: POSTGRES_PRODUCT_DATABASE is not defined in db.ts ProductService/test.');
}

if (!POSTGRES_USER) {
  console.warn('Error: POSTGRES_USER is not defined in db.ts ProductService/test.');
}

if (!POSTGRES_PASSWORD) {
  console.warn('Error: POSTGRES_PASSWORD is not defined in db.ts ProductService/test.');
}

const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_PRODUCT_DATABASE,
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
  // await run('sql/test.sql');
};

const shutdown = () => {
  pool.end(() => {
    // console.log('pool has ended');
  });
};

export { reset, shutdown };
