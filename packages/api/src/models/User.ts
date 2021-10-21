import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  username!: string;

  @Property({ required: true })
  password!: string;

  @Field()
  @Property({ required: true })
  avatar!: string;

  @Field(() => [String])
  @Property()
  projects: string[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
