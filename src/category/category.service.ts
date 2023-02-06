import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AppError } from 'src/shared/erros/app-erro';

import { CategoryReturnDTO } from 'src/category/dto/category.return.dto';

import { CategoryInput, UpdateCategoryInput } from './inputes/category.input';

import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<CategoryReturnDTO[]> {
    return await this.categoryModel.find().exec();
  }

  async findById(categoryId: string): Promise<CategoryReturnDTO> {
    const categoryById = await this.categoryModel.findById(categoryId);
    if (!categoryById) throw new AppError('Category Id is not exist');

    return categoryById;
  }

  async createCategory(
    createCategory: CategoryInput,
  ): Promise<CategoryReturnDTO> {
    const categoryByName = await this.categoryModel.find({
      name: createCategory.name,
    });

    if (categoryByName.length > 0)
      throw new AppError('category name already in use', 402);

    const createdCategory = await this.categoryModel.create(createCategory);

    await createdCategory.save();

    return createdCategory;
  }

  async update(
    updateCategory: UpdateCategoryInput,
  ): Promise<CategoryReturnDTO> {
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
