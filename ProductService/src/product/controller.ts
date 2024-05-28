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
import { NewProduct, Product, Order, Sort } from '.'
import { ProductService } from './service'

@Route('product')
export class ProductController extends Controller {
  // for getting all products regardless of category
  @Get('')
  public async getAll(
    @Query() page?: number,
    @Query() size?: number,
    @Query() order?: Order,
    @Query() sort?: Sort
  ): Promise<Product[]> {
    if (page || size || order) {
      const p: number = page ? (page - 1) : 0;
      const s: number = size ? size : 30;
      const o = order ? order : 'price';
      const sorted = sort ? sort : "DESC"
      return await new ProductService().getByPage(p, s, o, sorted)
    } else {
      return await new ProductService().getAll()
    }
  }

  // for getting products in a specific category
  @Get('/category/{category}')
  public async getCategory(
    @Path() category: string,
    @Query() page?: number,
    @Query() size?: number,
    @Query() order?: Order,
    @Query() sort?: Sort
  ): Promise<Product[]> {
    const p: number = page ? (page - 1) : 0;
    const s: number = size ? size : 30;
    const o = order ? order : 'price';
    const sorted = sort ? sort : "DESC"
    return await new ProductService().getByCategory(category, p, s, o, sorted);
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
  ): Promise<Product|undefined> {
    return await new ProductService().makeProduct(product)
      .then( async (success: Product|undefined): Promise<Product|undefined> => {
        if(!success) {
          console.error("Product Service: failed to create new product");
          this.setStatus(500);
        }
        return success;
      })
  }

  @Delete('{productId}')
  public async removeProduct(
    @Path() productId: string,
  ): Promise<Product|undefined> {
    return await new ProductService().removeProduct(productId);
  }
}