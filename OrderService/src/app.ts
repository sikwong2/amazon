
import express, { 
  Express, 
  Router,
  Response as ExResponse, 
  Request as ExRequest, 
} from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({path: '../.env'});
import swaggerUi from 'swagger-ui-express';

import {RegisterRoutes} from "../build/routes";

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
};

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  cors(corsOptions)
);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

const router = Router();
RegisterRoutes(router);
app.use('/api/v0', router);
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {products} = req.body;
    const line_items = products.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://www.ucsc-amazon.com/',
      cancel_url: 'https://www.ucsc-amazon.com/'

    })
    res.json({ url: session.url});
  } catch(e) {
    console.log(e);
  }
})
export default app;
