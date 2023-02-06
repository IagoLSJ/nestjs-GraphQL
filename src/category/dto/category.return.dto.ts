import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryReturnDTO {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  constructor(_id: string, name: string, createdAt: Date, updatedAt: Date) {
    this._id = _id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
