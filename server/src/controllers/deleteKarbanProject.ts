import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const deleteKarbanProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const filteredKarban = karban.projects.filter(
    (p) => p.projectId !== req.params.projectId
  );
  karban.projects = filteredKarban;
  await karban.save();
  res.json({ success: true, karban });
};
