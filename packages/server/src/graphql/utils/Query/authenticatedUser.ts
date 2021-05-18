import User from '../../../models/User';
import { ContextType } from '../../../utils/createContext';

// @ts-ignore
export const authenticatedUser: Promise<typeof User> = async (
  _parent: any,
  _args: any,
  ctx: ContextType
) => {
  if (!ctx.hasAuth) {
    throw new Error('No Authenticated user');
  }

  const authUser = await ctx.getUser();

  return authUser;
};
