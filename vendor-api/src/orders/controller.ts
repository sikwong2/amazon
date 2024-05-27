import {
  Controller,
  Get,
  Delete,
  Post,
  Path,
  Response,
  Request,
  Route,
  Security,
  SuccessResponse,
} from 'tsoa';

import { OrderService } from './service';
import { Order } from './index';

@Route('orders')
export class OrderController extends Controller {
  @Get('{vendorId}')
  @Response('404', 'Vendor not found')
  public async getOrders( 
    @Path() vendorId: string
  ):Promise<Order[] | undefined> {
    return new OrderService().getVendorOrders(vendorId)
      .then( async (success: Order[]|undefined): Promise<Order[]|undefined> => {
        if(!success) {
          console.log("Vendor API: order controller: no vendor orders to return");
          this.setStatus(404);
        }
        return success;
      })
  }
}