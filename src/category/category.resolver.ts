import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputes/category.input';

import { CategoryService } from './category.service';
import { CategoryReturnDTO } from './dto/category.return.dto';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryReturnDTO])
  async categories(): Promise<CategoryReturnDTO[]> {
    return await this.categoryService.findAll();
  }

  @Mutation(() => CategoryReturnDTO)
  async createCategory(
    @Args('input') input: CategoryInput,
  ): Promise<CategoryReturnDTO> {
    return await this.categoryService.createCategory(input);
  }

  @Query(() => CategoryReturnDTO)
  async findCategory(
    @Args('input') input: FindCategoryInput,
  ): Promise<CategoryReturnDTO> {
    return await this.categoryService.findById(input._id);
  }

  @Mutation(() => CategoryReturnDTO)
  async updateCategory(
    @Args('input') input: UpdateCategoryInput,
  ): Promise<CategoryReturnDTO> {
    return await this.categoryService.update(input);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('input') input: FindCategoryInput): Promise<any> {
    return await this.categoryService.delete(input._id);
  }
}
