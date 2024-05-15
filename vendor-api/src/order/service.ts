import { order } from '.';

export class OrderService {
  // public async getOrders(vendorId: string): Promise<order[]> {
  public async getOrders(): Promise<order[]> {
    return new Promise((resolve, reject) => {
      // fetch(`http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order/${vendorId}`, {
      fetch(`http://localhost:${process.env.ORDER_SERVICE_PORT}/api/v0/order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw res
          }
          return res.json()
        })
        .then((orders) => {
          resolve(orders)
        })
        .catch((err) => {
          console.log(err)
          reject(new Error("Failed to retrieve vendor's orders"))
        });
    })
  }
}