import User, { UserDoc } from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  username: string;
  password: string;
}

export const login = async (
  _parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<UserDoc> => {
  const { username, password } = args;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Username not found');
  }
  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    throw new Error('Password is incorrect');
  }
  ctx.req.session.userId = user._id;
  return user;
};
