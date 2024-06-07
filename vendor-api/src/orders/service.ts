import { Order } from '.';

export class OrdersService {
  public async getVendorOrders(vendorId: string): Promise<Order[] | undefined> {
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
  }
}
