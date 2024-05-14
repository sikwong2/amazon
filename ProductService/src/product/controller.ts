import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Route,
  Body,
  Request,
  Path,
  Response,
} from 'tsoa'
import { NewProduct, Product } from '.'
import { ProductService } from './service'

@Route('product')
export class ProductController extends Controller {
  @Get('')
  public async getAll(): Promise<Product[]> {
    return await new ProductService().getAll();
  }

  @Get('{productId}')
  public async getId(
    @Path() productId: string,
  ): Promise<Product|undefined> {
    return await new ProductService().getId(productId);
  }

  @Post('')
  @Response('201', 'Created')
  public async makeProduct(
    @Body() product: NewProduct
  ): Promise<Product> {
    return await new ProductService().makeProduct(product);
  }

  @Delete('{productId}')
  public async removeProduct(
    @Path() productId: string,
  ): Promise<Product|undefined> {
    return await new ProductService().removeProduct(productId);
  }
}