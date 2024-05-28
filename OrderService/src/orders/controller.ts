
import {
  Path,
  Controller,
  Get,
  Response,
  Route,
  Delete,
} from 'tsoa';

import { OrdersInfo} from '.';
import { OrdersService } from './service';

@Route('orders')
export class OrdersController extends Controller {
  @Get("vendor/{Id}")
  @Response('200', 'Successful')
  public async getByVendorId(
    @Path() Id: string
  ):
  Promise<OrdersInfo[]|undefined> {
    return new OrdersService().selectByVendorId(Id)
    .then(async (OrderInfo:OrdersInfo[]|undefined):
    Promise<OrdersInfo[]|undefined> => {
      if (!OrderInfo){
        this.setStatus(400)
      }
      return OrderInfo;
    });
  }

  @Get("shopper/{Id}")
  @Response('200', 'Successful')
  public async getByShopperId(
    @Path() Id: string
  ):
    Promise<OrdersInfo[] | undefined> {
    return new OrdersService().selectByShopperId(Id)
      .then(async (OrderInfo: OrdersInfo[] | undefined):
        Promise<OrdersInfo[] | undefined> => {
        if (!OrderInfo) {
          this.setStatus(400)
        }
        return OrderInfo;
      });
  }
  @Delete("{orderId}")
  public async deleteOrder(
    @Path() orderId: string
  ): Promise<OrdersInfo> {
    return await new OrdersService().deleteOrder(orderId);
  }

  @Get("shopper/{shopperId}/{status}")
  public async getOrdersByStatus(
    @Path() shopperId: string,
    @Path() status: string
  ): Promise<OrdersInfo[]> {
    return await new OrdersService().getOrdersByStatus(shopperId, status);
  }
}
