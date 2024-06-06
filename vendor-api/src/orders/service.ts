import { Order } from '.';

export class OrdersService {
  public async getVendorOrders(vendorId: string): Promise<Order[] | undefined> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/vendor/${vendorId}`,
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
      console.error(e);
      throw new Error('Vendor API: failed to retrieve vendor orders');
    }
  }
}