import { Request } from 'express';
import User from '../models/User';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<typeof User | null>;
  req: Request;
};

export const createContext = async (req: Request): Promise<ContextType> => {
  const uid = (req.session as any).passport?.user?.id;

  return {
    hasAuth: !!uid,
    uid,
    // @ts-ignore
    getUser: async () => {
      const user = await User.findOne(uid);

      return user ?? null;
    },
    req,
  };
};
