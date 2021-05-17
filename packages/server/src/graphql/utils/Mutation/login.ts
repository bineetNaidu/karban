import User from '../../../models/User';

interface Args {
  username: string;
  password: string;
}

export const login = async (parent: any, args: Args) => {
  const user = await User.login(args.username, args.password);
  return user;
};
