
import {OrderInfo, OrderResponse, OrderUpdate } from '.';
import { pool } from '../db';

export class OrderService {
  public async create(OrderInfo: OrderInfo): Promise<OrderResponse|undefined> {
    let insert = 
      `INSERT INTO orders (data, vendor_id, shopper_id) VALUES 
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

  public async selectById (id: string): Promise<OrderInfo[] | undefined> {
    let select = `SELECT data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE vendor_id = $1 OR shopper_id = $1`;
    const query = {
      text: select,
      values: [id]
    };
    try {
      const { rows } = await pool.query(query); 
      const orders = rows.map(row => ({
        productId: row.productid,
        shopperId: row.shopperid,
        vendorId: row.vendorid,
        orderStatus: row.orderstatus
      }));
      return orders;
    } catch (error) {
      console.error('Error getting Id', error);
      return undefined;
    }
  }

  public async selectByOrderId(id: string):Promise<OrderInfo|undefined> {
    let select = `SELECT data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE id = $1`;
    const query = {
      text: select,
      values: [id]
    };
    try {
      const { rows } = await pool.query(query); 
      const returnObj = {
        productId: rows[0].productid,
        shopperId: rows[0].shopperid,
        vendorId: rows[0].vendorid, 
        orderStatus: rows[0].orderstatus
      }
      console.log(returnObj.productId);
      return returnObj;
    } catch (error) {
      console.error('Error getting Id', error);
      return undefined;
    }
  }

  public async updateOrderStatus(status: OrderUpdate, id: string):Promise<OrderInfo|undefined> {
    const statusMap : {[key: number]: string} = {
      0: 'pending',
      1: 'shipped',
      2: 'completed',
      3: 'cancelled'
    };
    
    const statusString = statusMap[status.statusCode];
    
    let update = `UPDATE orders SET order_status = $1
    WHERE id = $2`;
    const query = {
      text: update,
      values: [statusString, id]
    }
    try {
      await pool.query(query);
      const returnObj = this.selectByOrderId(id);
      return returnObj;
    } catch (error){
      console.log('Error updating', error);
      return undefined;
    }
  }
}