import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';

const { VENDOR_API_PORT } = process.env;

if (!VENDOR_API_PORT) {
  console.error('Error: VENDOR_API_PORT is not defined in .env file.');
  process.exit(1);
}

app.listen(Number(VENDOR_API_PORT), () => {
  console.log(`Vendor API Server Running on port ${VENDOR_API_PORT}`);
  console.log(`API Testing UI: http://localhost:${VENDOR_API_PORT}/api/v0/docs/`);
});
