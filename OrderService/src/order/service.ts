/*
#######################################################################
#
# Copyright (C) 2022-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {OrderInfo, OrderReponse } from '.';
import { pool } from '../db';

export class OrderService {
  public async create(OrderInfo: OrderInfo): Promise<OrderReponse|undefined> {
    let insert = 
      `INSERT INTO order_table (data, vendor_id, shopper_id) VALUES 
     (jsonb_build_object('productId', $1::uuid), $2::uuid, $3::uuid) RETURNING id`;
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

  // public async login(credentials: Credentials): Promise<Authenticated|undefined>  {
  //   const account = await this.find(credentials);
  //   if (account) {
  //     const accessToken = jwt.sign(
  //       {id: account.id, role: account.role}, 
  //       `${process.env.MASTER_SECRET}`, {
  //         expiresIn: '30m',
  //         algorithm: 'HS256'
  //       });
  //     return {id: account.id, name: account.name, accessToken: accessToken};
  //   } else {
  //     return undefined;
  //   }
  // }

  // public async check(accessToken: string): Promise<SessionUser>  {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       jwt.verify(accessToken, 
  //         `${process.env.MASTER_SECRET}`, 
  //         (err: jwt.VerifyErrors | null, decoded?: object | string) => {
  //           if (err) {
  //             reject(err);
  //           } 
  //           const account = decoded as Account
  //           resolve({id: account.id, role: account.role});
  //         });
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }
}