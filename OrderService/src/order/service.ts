
import {OrderInfo, OrderResponse } from '.';
import { pool } from '../db';

export class OrderService {
  public async create(OrderInfo: OrderInfo): Promise<OrderResponse|undefined> {
    let insert = 
      `INSERT INTO order_table (data, vendor_id, shopper_id) VALUES 
     (jsonb_build_object('productId', $1::uuid), $2::uuid, $3::uuid) RETURNING id`;
    const query = {
      text: insert,
      values: [OrderInfo.productId, OrderInfo.vendorId, OrderInfo.shopperId],
    };
    const {rows} = await pool.query(query);
    if (rows.length != 0){
      const id = rows[0].id;
      const orderResponse = {
        orderId: id
      }
      return orderResponse;
    }
    else {
      return undefined;
    }
  }

  public async selectAll(): Promise<OrderResponse[] | undefined> {
    let select = `SELECT id FROM order_table`;
    const query = {
      text: select
    };
    try {
      const { rows } = await pool.query(query);
      // Map rows to an array of objects with orderId property
      const orderIds = rows.map(row => ({
        orderId: row.id
      }));
      return orderIds;
    } catch (error) {
      console.error('Error executing select all orders query:', error);
      return undefined;
    }
  }
}