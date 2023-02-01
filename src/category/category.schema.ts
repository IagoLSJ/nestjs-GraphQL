import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

export class Category {
  @Prop()
  name: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const CategorySchemaMongo = SchemaFactory.createForClass(Category);
