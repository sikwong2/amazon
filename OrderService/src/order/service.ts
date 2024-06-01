import { OrderInfo, OrderResponse, OrderUpdate } from '.';
import { pool } from '../db';

export class OrderService {
  public async create(OrderInfo: OrderInfo): Promise<OrderResponse|undefined> {
    let today = new Date();
    let insert = 
      `INSERT INTO orders (data, vendor_id, shopper_id) VALUES 
     (jsonb_build_object('products', $1::jsonb, 'orderDate', $4::timestamptz), $2::uuid, $3::uuid) RETURNING id`;
    const query = {
      text: insert,
      values: [JSON.stringify(OrderInfo.products), OrderInfo.vendorId, OrderInfo.shopperId, today],
    };
    const { rows } = await pool.query(query);
    const id = rows[0].id;
    const orderResponse = {
      orderId: id,
    };
    return orderResponse;
  }

  public async selectByOrderId(id: string):Promise<OrderInfo|undefined> {
    let select = `SELECT data->>'products' as products, data->>'orderDate' as orderDate, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE id = $1`;
    const query = {
      text: select,
      values: [id],
    };
    try {
      const { rows } = await pool.query(query);
      const returnObj = {
        products: rows[0].products,
        shopperId: rows[0].shopperid,
        vendorId: rows[0].vendorid, 
        orderStatus: rows[0].orderstatus,
        orderDate: rows[0].orderdate
      }
      return returnObj;
    } catch (error) {
      console.error('Error getting Id', error);
      return undefined;
    }
  }

  public async updateOrderStatus(status: OrderUpdate, id: string): Promise<OrderInfo> {
    const statuses = [
      'pending',
      'confirmed',
      'shipped',
      'delayed',
      'out for delivery',
      'delivered',
      'cancelled',
      'refunded',
      'returned',
    ];

    let update = `UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *;`;
    const query = {
      text: update,
      values: [status.status, id],
    };
    const { rows } = await pool.query(query);
    const ret: OrderInfo = {
      products: rows[0].data.products,
      shopperId: rows[0].shopperid,
      vendorId: rows[0].vendorid,
      orderStatus: rows[0].orderstatus,
    }
    return ret;

  }
}
