import { Controller, Get, Path, Post, Route, SuccessResponse, Response, Body, Delete, Put } from "tsoa";
import { Category, NewCategory } from ".";
import { CategoryService } from './service'

@Route('category')
export class CategoryController extends Controller {
  @Get('')
  public async getAll(): Promise<Category[]> {
    return await new CategoryService().getAll();
  }

  @Get('{productId}')
  public async getCategoriesOfProducts(
    @Path() productId: string
  ): Promise<Category[]> {
    return await new CategoryService().getCategoriesOfProducts(productId);
  }

  @Post()
  @Response('409', 'Category Exists')
  @SuccessResponse('201', 'Category Created')
  public async createCategory(@Body() category: NewCategory): Promise<Category | undefined> {
    return await new CategoryService()
      .create(category.name)
      .then(async (response: Category | undefined): Promise<Category | undefined> => {
        if (response === undefined) {
          this.setStatus(409);
        }
        return response;
      });
  }

  @Delete('{categoryName}')
  @Response('404', 'Category Not Found')
  @SuccessResponse('204', 'Deleted Category')
  public async deleteCategory(@Path() categoryName: string): Promise<void> {
    console.log("here!!")
    const categoryDeleted = await new CategoryService().delete(categoryName);
    if (!categoryDeleted) {
      this.setStatus(404);
    }
  }

  @Delete('/id/{categoryId}')
  @Response('404', 'Category Not Found')
  @SuccessResponse('204', 'Deleted Category')
  public async deleteCategoryById(@Path() categoryId: string): Promise<void> {
    const categoryDeleted = await new CategoryService().delete(categoryId, true);
    if (!categoryDeleted) {
      this.setStatus(404);
    }
  }
}