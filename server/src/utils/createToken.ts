import jwt from 'jsonwebtoken';

export const createToken = (id: string) => {
  const maxAge = 3 * 24 * 60 * 60; // ? 3 days
  const token = jwt.sign(id, process.env.JWT_SECRET!, {
    expiresIn: maxAge,
  });

  return token;
};
