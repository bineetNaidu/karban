import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getKarbanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  res.json({ success: true, karban });
};
