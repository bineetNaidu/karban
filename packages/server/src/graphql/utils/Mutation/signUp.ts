import User from '../../../models/User';

interface Args {
  avatar: string;
  username: string;
  email: string;
  password: string;
}

export const signUp = async (parent: any, args: Args) => {
  const user = User.build({
    avatar: args.avatar,
    username: args.username,
    email: args.email,
    password: args.password,
  });

  await user.save();

  return user;
};
