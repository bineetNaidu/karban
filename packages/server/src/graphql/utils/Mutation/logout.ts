import { ContextType } from '../../../utils/createContext';

export const logout = async (
  _parent: any,
  _args: any,
  ctx: ContextType
): Promise<boolean> => {
  return new Promise((resolve) =>
    ctx.req.session.destroy((err: Error) => {
      if (err) {
        console.log(err.message);

        resolve(false);
        return;
      }

      ctx.res.clearCookie('KarbanSess');
      resolve(true);
    })
  );
};
