import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.schema';

@ObjectType()
export class CreateBookDTO {
  @Field()
  readonly name: string;

  @Field()
  readonly author: string;

  @Field()
  readonly publishingCompany: string;

  @Field()
  readonly category: Category;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
