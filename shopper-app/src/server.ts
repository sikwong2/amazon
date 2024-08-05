import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import requestRoutes from './routes/request';
import oauthRoutes from './routes/oauth';

dotenv.config();

console.log('Client ID:', process.env.GOOGLE_OAUTH_CLIENT_ID);

const app: Express = express();

// Update CORS configuration to allow requests from http://localhost:3000
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
  resave: false,
  saveUninitialized: true
}));

app.use('/request', requestRoutes);
app.use('/oauth', oauthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the OAuth server');
});

const PORT = process.env.PORT || 3015;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

export default app;
