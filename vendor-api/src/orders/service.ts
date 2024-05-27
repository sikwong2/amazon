import { Order } from '.';

export class OrderService {
  public async getVendorOrders(vendorId: string): Promise<Order[]|undefined> {
    try {
      const res = await fetch(
        `http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/orders/vendor/${vendorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await res.json();
      // there's no way currently implemented to check if vendor id exists, so just return a 404
      if(!json || json.length === 0) {
        return undefined;
      } else {
        return json;
      }
    } catch (e) {
      console.error(e);
      throw new Error('Vendor API: failed to retrieve vendor orders')
    }
  }
}


  // public async getOrders(vendorId: string): Promise<order[]> {
//   public async getOrders(): Promise<order[]> {
//     return new Promise((resolve, reject) => {
//       // fetch(`http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order/${vendorId}`, {
//       fetch(`http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw res
//           }
//           return res.json()
//         })
//         .then((orders) => {
//           resolve(orders)
//         })
//         .catch((err) => {
//           console.log(err)
//           reject(new Error("Failed to retrieve vendor's orders"))
//         });
//     })
//   }
// }



