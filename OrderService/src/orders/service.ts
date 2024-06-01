import { OrdersInfo } from '.';
import { pool } from '../db';

export class OrdersService {
  public async selectByVendorId(id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT * FROM orders WHERE vendor_id = $1`;
    const query = {
      text: select,
      values: [id],
    };
    try {
      const { rows } = await pool.query(query);
      const orders = rows.map((row) => ({
        orderId: row.id,
        products: row.data.products,
        shopperId: row.shopper_id,
        vendorId: row.vendor_id,
        orderStatus: row.order_status,
        orderDate: new Date(row.data.orderDate)
      }));
      return orders;
    } catch (error) {
      console.error('Error getting Id', error);
      return undefined;
    }
  }

  public async selectByShopperId(id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT * FROM orders WHERE shopper_id = $1`;
    const query = {
      text: select,
      values: [id],
    };
    try {
      const { rows } = await pool.query(query);
      const orders = rows.map((row) => ({
        orderId: row.id,
        products: row.data.products,
        shopperId: row.shopper_id,
        vendorId: row.vendor_id,
        orderStatus: row.order_status,
        orderDate: new Date(row.data.orderDate)
      }));
      return orders;
    } catch (error) {
      console.error('Error getting Id', error);
      return undefined;
    }
  }
  public async deleteOrder(orderId: string): Promise<OrdersInfo> {
    try {
      const query = {
        text: 'DELETE FROM orders WHERE id = $1 RETURNING *;',
        values: [orderId],
      };
      const { rows } = await pool.query(query);
      return {
        orderId: rows[0].id,
        products: rows[0].data['products'],
        vendorId: rows[0].vendor_id,
        shopperId: rows[0].shopper_id,
        orderStatus: rows[0].order_status,
        orderDate: new Date(rows[0].data.orderDate)
      })
    } catch (e) {
      console.log(e);
      throw new Error('OrdersService: deleteOrder');
    }
  }

  public async getOrdersByStatus(shopperId: string, status: string): Promise<OrdersInfo[]> {
    const query = {
      text: 'SELECT * FROM orders WHERE shopper_id=$1 AND order_status=$2;',
      values: [shopperId, status],
    };
    const { rows } = await pool.query(query);
    const orders = [];
    for (const row of rows) {
      orders.push({
        orderId: row.id,
        products: row.data['products'],
        vendorId: row.vendor_id,
        shopperId: row.shopper_id,
        orderStatus: row.order_status,
        orderDate: new Date(row.data.orderDate)
      })
    }
    return orders;
  }
}
