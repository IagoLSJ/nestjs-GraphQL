import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookInput {
  @Field()
  readonly name: string;

  @Field()
  readonly author: string;

  @Field()
  readonly publishingCompany: string;

  @Field()
  readonly categoryId: string;
}

@InputType()
export class UpdateBookInput {
  @Field()
  readonly _id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly author: string;

  @Field()
  readonly publishingCompany: string;

  @Field()
  readonly categoryId: string;
}

@InputType()
export class FindBookInput {
  @Field()
  readonly _id: string;
}
