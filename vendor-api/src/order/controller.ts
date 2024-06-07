import { Controller, Put, Path, Response, Body, Route, Security } from 'tsoa';

import { OrderService } from './service';
import { Order } from '../orders';
import { StatusUpdate } from '.';

@Route('order')
export class OrderController extends Controller {
  @Security('jwt')
  @Put('{orderId}')
  @Response('404', 'Order not found')
  public async getOrders(
    @Path() orderId: string,
    @Body() statusUpdate: StatusUpdate,
  ): Promise<Order | undefined> {
    return new OrderService()
      .updateOrderStatus(orderId, statusUpdate)
      .then(async (success: Order | undefined): Promise<Order | undefined> => {
        return success;
      });
  }
}
