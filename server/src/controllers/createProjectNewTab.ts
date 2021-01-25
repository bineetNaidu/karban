import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const createProjectNewTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tabName } = req.body;
  const karban = await Karban.buildProjectTab(
    req.params.id,
    req.params.projectId,
    tabName
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};
