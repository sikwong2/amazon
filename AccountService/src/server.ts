import dotenv from 'dotenv';
dotenv.config({path : '../.env'});

import app from './app';

app.listen(Number(process.env.ACCOUNT_SERVICE_PORT), () => {
  console.log(`Account Service Server Running on port ${process.env.ACCOUNT_SERVICE_PORT}`);
  console.log(`Account Service API Testing UI: http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/docs/`);
});