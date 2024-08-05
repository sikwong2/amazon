import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  // Set CORS headers to allow interactions between different origins
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST');

  const redirectUrl = 'http://localhost:3015/oauth';

  // Initialize OAuth client with environment variable settings
  const oAuthClient = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUrl
  );

  // Generate the authorization URL with specific scopes
  const authorizeUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    prompt: 'consent'
  });

  // Send JSON response with the authorization URL
  res.json({ url: authorizeUrl });
});

export default router;
