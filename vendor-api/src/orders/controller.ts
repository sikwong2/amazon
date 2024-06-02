import { Controller, Get, Request, Response, Route, Security } from 'tsoa';
import * as express from 'express';

import { OrdersService } from './service';
import { Order } from './index';

@Route('orders')
export class OrdersController extends Controller {
  @Security('jwt')
  @Get('')
  @Response('404', 'Vendor not found')
  public async getOrders(@Request() request: express.Request): Promise<Order[] | undefined> {
    const vendorId = request.user?.id;

    if (!vendorId) {
      console.log('Vendor API: order controller: no vendorId provided');
      this.setStatus(404);
      return;
    }

    return new OrdersService()
      .getVendorOrders(vendorId)
      .then(async (success: Order[] | undefined): Promise<Order[] | undefined> => {
        if (!success) {
          console.log('Vendor API: order controller: no vendor orders to return');
          this.setStatus(404);
        }
        return success;
      });
  }
}
