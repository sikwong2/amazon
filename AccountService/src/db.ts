import { Pool } from 'pg';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_ACCOUNT_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

console.log('POSTGRES_HOST:', POSTGRES_HOST);
console.log('POSTGRES_PORT:', POSTGRES_PORT);
console.log('POSTGRES_ACCOUNT_DATABASE:', POSTGRES_ACCOUNT_DATABASE);
console.log('POSTGRES_USER:', POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', POSTGRES_PASSWORD);

if (!POSTGRES_HOST) {
  console.warn('Error: POSTGRES_HOST is not defined in db.ts AccountService.');
}

if (!POSTGRES_PORT) {
  console.warn('Error: POSTGRES_ACCOUNT_PORT is not defined in db.ts AccountService.');
}

if (!POSTGRES_ACCOUNT_DATABASE) {
  console.warn('Error: POSTGRES_ACCOUNT_DATABASE is not defined in db.ts AccountService.');
}

if (!POSTGRES_USER) {
  console.warn('Error: POSTGRES_USER is not defined in db.ts AccountService.');
}

if (!POSTGRES_PASSWORD) {
  console.warn('Error: POSTGRES_PASSWORD is not defined in db.ts AccountService.');
}

const pool = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_ACCOUNT_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export { pool };