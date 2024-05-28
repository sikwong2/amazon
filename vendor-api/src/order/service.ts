import { StatusUpdate } from '.';
import { Order } from '../orders';

export class OrderService {
  public async updateOrderStatus(orderId: string, statusUpdate: StatusUpdate): Promise<Order|undefined> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order/${orderId}`, {
          method: 'PUT',
          body: JSON.stringify(statusUpdate),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await res.json();
      if(!json || json.length === 0) {
        return undefined;
      } else {
        return json;
      }
    } catch (e) {
      console.error(e);
      throw new Error('Vendor API: failed to update order status')
    }
  }
}
