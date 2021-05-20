import { Request } from 'express';
import User, { UserDoc } from '../models/User';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<UserDoc>;
  req: Request;
};

export const createContext = async (req: Request): Promise<ContextType> => {
  const uid = (req.session as any).passport?.user?._id;

  return {
    hasAuth: !!uid,
    uid,
    // @ts-ignore
    getUser: async () => {
      const user = await User.findOne({ _id: uid });
      return user;
    },
    req,
  };
};
