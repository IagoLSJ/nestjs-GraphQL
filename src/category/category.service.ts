import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './category.schema';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputes/category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findById(category: FindCategoryInput): Promise<Category> {
    return await this.categoryModel.findById(category._id);
  }

  async createCategory(createCategory: CategoryInput): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(createCategory);
      await createdCategory.save();
      return createdCategory;
    } catch (err) {
      return err;
    }
  }

  async update(updateCategory: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryModel.findOne(
      new Types.ObjectId(updateCategory._id),
    );

    category.name = updateCategory.name;

    return category.save();
  }

  async delete(_id: string): Promise<any> {
    const categoryDeleted = await this.categoryModel.findByIdAndDelete(_id);
    if (categoryDeleted != null) return 'Category remove with success';
    return 'Category id is not exist';
  }
}
