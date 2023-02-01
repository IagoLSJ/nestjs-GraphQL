import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputes/category.input';
import { CategoryService } from './category.service';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { CreateCategoryDTO } from './dto/category.dto';
import { Category } from './category.schema';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CreateCategoryDTO])
  async categories() {
    return await this.categoryService.findAll();
  }

  @Mutation(() => CreateCategoryDTO)
  async createCategory(@Args('input') input: CategoryInput): Promise<Category> {
    return await this.categoryService.createCategory(input);
  }

  @Query(() => CreateCategoryDTO)
  async findCategory(@Args('input') input: FindCategoryInput): Promise<any> {
    return await this.categoryService.findById(input);
  }

  @Mutation(() => CreateCategoryDTO)
  async updateCategory(
    @Args('input') input: UpdateCategoryInput,
  ): Promise<any> {
    return await this.categoryService.update(input);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('input') input: FindCategoryInput): Promise<any> {
    return await this.categoryService.delete(input._id);
  }
}
