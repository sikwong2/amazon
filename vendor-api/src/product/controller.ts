import {
  Controller,
  Body,
  Route,
  Post,
} from 'tsoa';

import { ProductService } from './service';
import { NewProduct, Product } from '.';

@Route('product')
export class ProductController extends Controller {
  @Post('')
  public async getOrders( 
    @Body() newProduct: NewProduct
  ):Promise<Product | undefined> {
    return new ProductService().createProduct(newProduct)
      .then( async (success: Product|undefined): Promise<Product|undefined> => {
        if(!success) {
          console.log("Vendor API: product controller: failed to create new product");
          this.setStatus(500);
        }
        return success;
      })
  }
}