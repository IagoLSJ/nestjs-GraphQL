import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryResolver } from './category.resolver';
import { Category, CategorySchemaMongo } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchemaMongo },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
