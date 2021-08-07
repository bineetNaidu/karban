import { Request, Response } from 'express';

type CustomRequest = Request & { session: { userId: string } };

export type ContextType = {
  req: CustomRequest;
  res: Response;
};
