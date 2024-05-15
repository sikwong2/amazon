
import {OrdersInfo, OrderResponse, OrderUpdate } from '.';
import { pool } from '../db';

export class OrdersService {
  public async selectByVendorId (id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE vendor_id = $1`;
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

  public async selectByShopperId(id: string): Promise<OrdersInfo[] | undefined> {
    let select = `SELECT data->>'product' as productId, vendor_id as vendorId, shopper_id as shopperId, order_status as orderstatus FROM orders WHERE shopper_id = $1`;
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
}