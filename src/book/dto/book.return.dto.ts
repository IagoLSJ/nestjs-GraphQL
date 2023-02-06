import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryReturnDTO } from 'src/category/dto/category.return.dto';
@ObjectType()
export class BookReturnDTO {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  author: string;

  @Field()
  publishingCompany: string;

  @Field()
  category: CategoryReturnDTO;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(
    _id: string,
    name: string,
    author: string,
    publishingCompany: string,
    category: CategoryReturnDTO,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = _id;
    this.name = name;
    this.author = author;
    this.publishingCompany = publishingCompany;
    this.category =
      category &&
      new CategoryReturnDTO(
        category._id,
        category.name,
        category.createdAt,
        category.updatedAt,
      );
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
