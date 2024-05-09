import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.ACCOUNT_SERVICE_PORT, () => {
  console.log(`Server Running on port 3011`);
  console.log('API Testing UI: http://localhost:3011/api/v0/docs/');
});