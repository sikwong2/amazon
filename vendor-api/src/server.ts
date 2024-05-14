import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.VENDOR_API_PORT, () =>{ 
  console.log(`Vendor API Server Running on port ${process.env.VENDOR_API_PORT}`);
  console.log(`API Testing UI: http://localhost:${process.env.VENDOR_API_PORT}/api/v0/docs/`);
}); 