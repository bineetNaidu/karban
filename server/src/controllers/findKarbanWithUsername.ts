import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const findAKarbanWithUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { passcode } = req.body;
  if (!passcode) throw new Error('Passcode must be given');
  if (!req.query.username) {
    throw new Error('Username must be given');
  }
  const karban = await Karban.findOne({
    username: req.query.username.toString(),
  });
  if (!karban) throw new Error('karban not Found with the given Usernmae');
  const isMatch = karban.passcode === passcode;
  if (!isMatch) throw new Error('UnAuhtorized');
  res.json({ success: true, karban });
};
