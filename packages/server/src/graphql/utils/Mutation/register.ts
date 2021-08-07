import User, { UserDoc } from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  username: string;
  password: string;
  avatar?: string;
}

export const register = async (
  _parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<UserDoc> => {
  const { username, password, avatar = '' } = args;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username is taken');
  }
  const user = User.build({
    username,
    password,
    avatar,
  });

  await user.save();

  ctx.req.session.userId = user._id;
  return user;
};
