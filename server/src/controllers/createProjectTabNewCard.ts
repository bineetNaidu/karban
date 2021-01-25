import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const createProjectTabNewCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cardBody } = req.body;
  const karban = await Karban.buildProjectTabCard(
    req.params.id,
    req.params.projectId,
    req.params.tabId,
    cardBody
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};
