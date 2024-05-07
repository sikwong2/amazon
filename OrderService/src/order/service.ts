
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

  public async selectAll(): Promise<OrderResponse[] | undefined> {
    let select = `SELECT id FROM orders`;
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

  public async selectById(id: string):Promise<OrderInfo|undefined> {
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

  public async updateOrder(status: OrderUpdate, id: string):Promise<OrderInfo|undefined> {
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
      const returnObj = this.selectById(id);
      return returnObj;
    } catch (error){
      console.log('Error updating', error);
      return undefined;
    }
  }
}