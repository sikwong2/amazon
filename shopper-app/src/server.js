const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
console.log('Client ID:', process.env.GOOGLE_OAUTH_CLIENT_ID);
const requestRoutes = require('./routes/request');
const oauthRoutes = require('./routes/oauth');

const app = express();

// Update CORS configuration to allow requests from http://localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: `${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`, resave: false, saveUninitialized: true }));

app.use('/request', requestRoutes);
app.use('/oauth', oauthRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the OAuth server');
});

const PORT = process.env.PORT || 3015;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
