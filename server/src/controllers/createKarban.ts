import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const createKarban = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, passcode } = req.body;
  const karban = Karban.build(passcode, username);
  await karban.save();
  res.status(201).json({ success: true, karban });
};
