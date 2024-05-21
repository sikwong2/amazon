
import {OrdersInfo, OrderResponse, OrderUpdate } from '.';
import { pool } from '../db';

export class OrdersService {
  public async selectByVendorId (id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT id, data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE vendor_id = $1`;
    const query = {
      text: select,
      values: [id]
    };
    try {
      const { rows } = await pool.query(query); 
      const orders = rows.map(row => ({
        orderId: row.id,
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

  public async selectByShopperId(id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT id, data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE shopper_id = $1`;
    const query = {
      text: select,
      values: [id]
    };
    try {
      const { rows } = await pool.query(query);
      const orders = rows.map(row => ({
        orderId: row.id,
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
  public async deleteOrder(orderId: string): Promise<OrdersInfo> {
    try {
      const query = {
        text: 'DELETE FROM orders WHERE id = $1 RETURNING *;',
        values: [orderId]
      }
      const {rows} = await pool.query(query);
      return ({
        orderId: rows[0].id,
        productId: rows[0].data['product'],
        vendorId: rows[0].vendor_id,
        shopperId: rows[0].shopper_id,
        orderStatus: rows[0].order_status,
      })
    } catch (e) {
      console.log(e);
      throw new Error('OrdersService: deleteOrder');
    }
  }
}