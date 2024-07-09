const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

router.post('/', async function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  const redirectUrl = 'http://localhost:3015/oauth';
  const oAuthClient = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUrl
  );
  const authorizeUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  });
  res.json({ url: authorizeUrl });
});

module.exports = router;
