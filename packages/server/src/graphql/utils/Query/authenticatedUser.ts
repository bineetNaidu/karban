import User, { UserDoc } from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

export const authenticatedUser = async (
  _parent: any,
  _args: any,
  ctx: ContextType
): Promise<UserDoc | null> => {
  const authUser = await User.findOne({
    _id: ctx.req.session.userId,
  })
    .populate('projects')
    .exec();

  if (!authUser) {
    return null;
  }

  return authUser;
};
