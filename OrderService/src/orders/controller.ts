
import {
  Body,
  Query,
  Path,
  Controller,
  Post,
  Get,
  Response,
  Route,
  Put,
} from 'tsoa';

import { OrdersInfo, OrderResponse, OrderUpdate} from '.';
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
}
