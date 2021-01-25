import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const getKarbanByIdAndCreateNewProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectName, projectDescription } = req.body;
  const karban = await Karban.buildProject(
    req.params.id,
    projectName,
    projectDescription
  );
  await karban.save();
  res.status(201).json({ success: true, karban });
};
