import { User, UserModel } from '../models/User';
import { Query, Resolver, Mutation, InputType, Field, Arg } from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UserRegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  avatar?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  async me() {
    return 'Me Query';
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<User | null> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return null;
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { password, username, avatar }: UserRegisterInput
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      avatar:
        avatar || `https://avatars.dicebear.com/api/human/${username}.svg`,
      projects: [],
      typegooseName: {},
    });

    return user;
  }
}
