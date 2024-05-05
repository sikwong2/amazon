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

import {
  Body,
  Query,
  Controller,
  Post,
  Get,
  Response,
  Route,
} from 'tsoa';

import { OrderInfo, OrderReponse} from '.';
import { OrderService } from './service';

@Route('order')
export class OrderController extends Controller {
  @Post()
  @Response('201', 'Created')
  @Response('401', 'Unauthorized')
  public async createOrder(
    @Body() OrderInfo: OrderInfo,
  ): Promise<OrderReponse|undefined> {
    return new OrderService().create(OrderInfo)
      .then(async (OrderReponse: OrderReponse|undefined): Promise<OrderReponse|undefined> => {
        if (!OrderReponse) {
          this.setStatus(401)
        }
        return OrderReponse;
      });
  }

  //@Get()
  //@Response('401', 'Unauthorized')
  //public async check(
  //  @Query() accessToken: string,
  //): Promise<SessionUser|undefined> {
  //  return new AccountService().check(accessToken)
  //    .then(async (account: SessionUser|undefined): Promise<SessionUser|undefined> => {
  //      if (!account) {
  //        this.setStatus(401)
  //      }
  //      return account
  //    });
  //}
}

