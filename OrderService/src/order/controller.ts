import { Body, Query, Path, Controller, Post, Get, Response, Route, Put, SuccessResponse } from 'tsoa';

import { OrderInfo, OrderResponse, OrderUpdate } from '.';
import { OrderService } from './service';

@Route('order')
export class OrderController extends Controller {
  @Post()
  @SuccessResponse('201', 'Created')
  @Response('401', 'Unauthorized')
  public async createOrder(@Body() OrderInfo: OrderInfo): Promise<OrderResponse | undefined> {
    return new OrderService()
      .create(OrderInfo)
      .then(async (orderResponse: OrderResponse | undefined): Promise<OrderResponse | undefined> => {
        return orderResponse;
      });
  }

  @Get('{orderId}')
  @Response('200', 'Successful')
  public async getOrderById(@Path() orderId: string): Promise<OrderInfo | undefined> {
    return new OrderService()
      .selectByOrderId(orderId)
      .then(async (orderInfo: OrderInfo | undefined): Promise<OrderInfo | undefined> => {
        return orderInfo;
      });
  }

  @Put('{orderId}')
  @Response('200', 'Successful Update')
  @Response('404', 'Order Not Found')
  public async updateOrderStatus(
    @Path() orderId: string,
    @Body() orderUpdate: OrderUpdate,
  ): Promise<OrderInfo> {
    return new OrderService()
      .updateOrderStatus(orderUpdate, orderId)
      .then(async (OrderInfo: OrderInfo): Promise<OrderInfo> => {
        return OrderInfo;
      });
  }
}
