import { OrdersInfo, NewOrder } from './schema';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export class OrdersService {
  public async getByShopperId(shopperId: string): Promise<OrdersInfo[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/shopper/${shopperId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      throw new Error('Error in OrdersService: getByShopperId');
    }
  }
  public async deleteOrder(orderId: string): Promise<OrdersInfo> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/${orderId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      throw new Error('Error in OrdersService: deleteOrder');
    }
  }

  public async getOrdersByStatus(shopperId: string, status: string): Promise<OrdersInfo[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/shopper/${shopperId}/${status}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      throw new Error('Error in OrdersService: getOrdersByStatus');
    }
  }

  public async getOrders(shopperId: string): Promise<OrdersInfo[]> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/shopper/${shopperId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      throw new Error('Error in OrdersService: getOrder');
    }
  }

  public async createOrder(order: NewOrder): Promise<string> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        }
      );
      const json = await res.json();
      return json.orderId;
    } catch(e) {
      console.log(e);
      throw new Error('Error in OrdersService: createOrder');
    }
  }
}
