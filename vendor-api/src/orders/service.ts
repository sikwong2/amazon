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
      // there's no way currently implemented to check if vendor id exists, so just return a 404
      if (!json || json.length === 0) {
        return undefined;
      } else {
        return json;
      }
    } catch (e) {
      console.error(e);
      throw new Error('Vendor API: failed to retrieve vendor orders');
    }
  }
}
