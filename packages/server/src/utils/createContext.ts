import { Request, Response } from 'express';
import { UserDoc } from 'src/models/User';

type CustomRequest = Request & { session: { userId: string } };

export type ContextType = {
  req: CustomRequest;
  res: Response;
  hasAuth: boolean;
  getUser: () => Promise<UserDoc | null>;
};
