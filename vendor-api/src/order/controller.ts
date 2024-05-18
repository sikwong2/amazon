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

import * as express from 'express';
import { OrderService } from './service';
import { order } from './index';

@Route('order')
export class OrderController extends Controller {
  @Get('')
  public async getOrders( @Request() request: express.Request):Promise<order[]> {
    console.log("request: ", request);
    // return new OrderService().getOrders(request.user!.id);
    return new OrderService().getOrders();
  }
}