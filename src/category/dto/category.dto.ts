import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';

@ObjectType()
export class CreateCategoryDTO {
  @Field((type) => ID)
  readonly _id: string;

  @Directive('@upper')
  @Field({ nullable: false })
  readonly name: string;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
