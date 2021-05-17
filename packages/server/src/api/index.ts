import { Router } from 'express';
import { PassportStatic } from 'passport';
import authRouter from './auth';

export default (passport: PassportStatic): Router => {
  const apiRouter = Router();

  apiRouter.use('/v1/auth', authRouter(passport));

  return apiRouter;
};
