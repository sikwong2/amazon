const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  console.log('came here');
  console.log('data', data);
  return data;
}

router.get('/', async function (req, res, next) {
  const code = req.query.code;
  const state = req.query.state ? JSON.parse(req.query.state) : {};
  console.log(`this is the code ${code}`);
  try {
    const redirectUrl = 'http://localhost:3015/oauth';
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUrl
    );
    const tokenResponse = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokenResponse.tokens);
    console.log('Tokens acquired');
    const user = oAuth2Client.credentials;
    console.log('credentials', user);
    const userData = await getUserData(user.access_token);

    // Call GraphQL mutation to create Google account
    const googleInput = {
      name: userData.name,
      googleId: userData.sub,
      email: userData.email,
      role: 'shopper',
    };

    const createGoogleAccount = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
      mutation CreateGoogleAccount($input: NewGoogleAccount!) {
        createGoogleAccount(input: $input) {
          id
          name
          email
          role
        }
      }
    `,
        variables: {
          input: googleInput
        }
      })
    });

    const createGoogleAccountResponse = await createGoogleAccount.json();

    if (createGoogleAccountResponse.errors) {
      throw new Error(createGoogleAccountResponse.errors[0].message);
    }

    const accountData = createGoogleAccountResponse.data.createGoogleAccount;
    console.log(accountData);


    const redirectTo = `${state.redirectTo || 'http://localhost:3000'}?name=${encodeURIComponent(userData.name)}&access_token=${encodeURIComponent(user.access_token)}&sub=${encodeURIComponent(userData.sub)}&email=${encodeURIComponent(userData.email)}`;
    res.redirect(redirectTo);
  } catch (err) {
    console.log(err);
    console.log('Error with signing in with Google');
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
