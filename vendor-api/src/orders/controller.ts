import {
  Controller,
  Get,
  Path,
  Response,
  Route,
} from 'tsoa';

import { OrdersService } from './service';
import { Order } from './index';

@Route('orders')
export class OrdersController extends Controller {
  @Get('{vendorId}')
  @Response('404', 'Vendor not found')
  public async getOrders( 
    @Path() vendorId: string
  ):Promise<Order[] | undefined> {
    return new OrdersService().getVendorOrders(vendorId)
      .then( async (success: Order[]|undefined): Promise<Order[]|undefined> => {
        if(!success) {
          console.log("Vendor API: order controller: no vendor orders to return");
          this.setStatus(404);
        }
        return success;
      })
  }
}