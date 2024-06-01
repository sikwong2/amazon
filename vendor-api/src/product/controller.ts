import * as express from 'express';
import { Security, Controller, Body, Route, Post, Request, Response } from 'tsoa';

import { ProductService } from './service';
import { NewProduct, Product } from '.';


@Route('product')
export class ProductController extends Controller {
  @Post('')
  @Security('jwt')
  @Response('401', 'Unauthorised')
  public async getOrders(
    @Request() request: express.Request,
    @Body() newProduct: NewProduct,
  ): Promise<Product | undefined> {

    console.log('user.id = ', request.user?.id);

    return new ProductService()
      .createProduct(newProduct)
      .then(async (success: Product | undefined): Promise<Product | undefined> => {
        if (!success) {
          console.log('Vendor API: product controller: failed to create new product');
          this.setStatus(500);
        }
        return success;
      });
  }
}
