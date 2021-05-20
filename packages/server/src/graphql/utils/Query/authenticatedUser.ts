import User, { UserDoc } from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

// @ts-ignore
export const authenticatedUser: Promise<UserDoc> = async (
  _parent: any,
  _args: any,
  ctx: ContextType
) => {
  if (!ctx.hasAuth) {
    throw new Error('No Authenticated user');
  }

  const authUser = await User.findOne({ _id: ctx.uid })
    .populate('projects')
    .exec();

  return authUser;
};
