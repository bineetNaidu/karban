import User from '../models/User';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<typeof User>;
};

export const createContext = async (req: any): Promise<ContextType> => {
  const uid = (req.session as any)?.passport?.user?.id;

  // @ts-ignore
  return { hasAuth: !!uid, uid, getUser: async () => await User.findOne(uid) };
};
