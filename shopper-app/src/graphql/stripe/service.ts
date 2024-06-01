import { StripeProduct } from "./schema";
import dotenv from 'dotenv';
dotenv.config({path : '../.env'});

export class StripeService {
  public async getCheckoutURL(products: StripeProduct[]): Promise<string> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ products })
        }
      )
      const json = await res.json();
      return json.url;
    } catch(e) {
      console.log(e);
      throw new Error('graphql/stripe/service.ts')
    }
  }
}