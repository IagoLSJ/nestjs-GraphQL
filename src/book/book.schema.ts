import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Category } from 'src/category/category.schema';

@Schema()
export class Book {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  publishingCompany: string;

  @Prop({ type: Category })
  @Type(() => Category)
  category: Category;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
