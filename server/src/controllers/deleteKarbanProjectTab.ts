import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const deleteKarbanProjectTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const project = karban.projects.find(
    (p) => p.projectId === req.params.projectId
  );
  if (!project) throw new Error('Karban Project Not Found');
  const filteredKarbanProjectTabs = project.tabs.filter(
    (t) => t.tabId !== req.params.tabId
  );
  project.tabs = filteredKarbanProjectTabs;
  await karban.save();
  res.json({ success: true, karban });
};
