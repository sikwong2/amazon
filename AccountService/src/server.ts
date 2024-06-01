import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';

const { ACCOUNT_SERVICE_PORT } = process.env;

if (!ACCOUNT_SERVICE_PORT) {
  console.error('Error: ACCOUNT_SERVICE_PORT is not defined in .env file.');
  process.exit(1);
}

app.listen(Number(ACCOUNT_SERVICE_PORT), () => {
  console.log(`Account Service Server Running on port ${ACCOUNT_SERVICE_PORT}`);
  console.log(
    `Account Service API Testing UI: http://localhost:${ACCOUNT_SERVICE_PORT}/api/v0/docs/`,
  );
});
