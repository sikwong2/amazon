
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

import { OrderInfo, OrderResponse, OrderUpdate} from '.';
import { OrderService } from './service';

@Route('order')
export class OrderController extends Controller {
  @Post()
  @Response('201', 'Created')
  @Response('401', 'Unauthorized')
  public async createOrder(
    @Body() OrderInfo: OrderInfo,
  ): Promise<OrderResponse|undefined> {
    return new OrderService().create(OrderInfo)
      .then(async (OrderReponse: OrderResponse|undefined): Promise<OrderResponse|undefined> => {
        if (!OrderReponse) {
          this.setStatus(401)
        }
        return OrderReponse;
      });
  }

  @Get("{Id}")
  @Response('200', 'Successful')
  public async getByShopperId(
    @Path() Id: string
  ):
  Promise<OrderInfo[]|undefined> {
    return new OrderService().selectById(Id)
    .then(async (OrderInfo:OrderInfo[]|undefined):
    Promise<OrderInfo[]|undefined> => {
      if (!OrderInfo){
        this.setStatus(400)
      }
      return OrderInfo;
    });
  }

  @Get("{orderId}")
  @Response('200', 'Successful')
  public async getOrderById(
    @Path() orderId: string
  ): Promise<OrderInfo | undefined>{
    return new OrderService().selectByOrderId(orderId)
    .then(async (OrderInfo: OrderInfo | undefined):
      Promise<OrderInfo | undefined> => {
      if (!OrderInfo) {
        this.setStatus(400)
      }
      return OrderInfo;
    }); 
  }

 @Put("{orderId}")
 @Response('200', 'Successful Update')
 @Response('404', 'Order Not Found')
 public async updateOrderStatus(
  @Path() orderId: string,
  @Body() orderUpdate:  OrderUpdate
 ): Promise<OrderInfo | undefined> {
   return new OrderService().updateOrderStatus(orderUpdate, orderId)
     .then(async (OrderInfo: OrderInfo | undefined):
       Promise<OrderInfo | undefined> => {
       if (!OrderInfo) {
         this.setStatus(400)
       }
       return OrderInfo;
     });
   }
}
