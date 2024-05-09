
import {OrderInfo, OrderReponse } from '.';
import { pool } from '../db';

export class OrderService {
  public async create(OrderInfo: OrderInfo): Promise<OrderReponse|undefined> {
    let insert = 
      `INSERT INTO order_(data, vendor_id, shopper_id) VALUES(jsonb_build_object('productId', $1::UUID), $2::UUID, $3::UUID) RETURNING id;`;
    const query = {
      text: insert,
      values: [OrderInfo.productId, OrderInfo.vendorId, OrderInfo.shopperId],
    };
    const {rows} = await pool.query(query)
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
}