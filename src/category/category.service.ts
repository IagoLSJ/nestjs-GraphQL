import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './inputes/category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findById(category: FindCategoryInput): Promise<Category> {
    return await this.categoryModel.findById(category._id);
  }

  async create(createCategory: CategoryInput): Promise<Category> {
    try {
      const createdCategory = await this.categoryModel.create(createCategory);
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
    return await this.categoryModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }
}
