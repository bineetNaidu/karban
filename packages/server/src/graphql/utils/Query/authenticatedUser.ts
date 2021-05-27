import User, { UserDoc } from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

// @ts-ignore
export const authenticatedUser: Promise<UserDoc | null> = async (
  _parent: any,
  _args: any,
  ctx: ContextType
) => {
  const authUser = await User.findOne({ _id: ctx.uid })
    .populate('projects')
    .exec();

  if (!authUser) {
    return null;
  }

  return authUser;
};
