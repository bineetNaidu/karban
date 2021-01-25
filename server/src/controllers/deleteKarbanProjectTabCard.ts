import { Request, Response } from 'express';
import Karban from '../models/Karban';

export const deleteKarbanProjectTabCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const karban = await Karban.findOne({ _id: req.params.id });
  if (!karban) throw new Error('karban not Found with the given ID');
  const project = karban.projects.find(
    (p) => p.projectId === req.params.projectId
  );
  if (!project) throw new Error('Karban Project Not Found');
  const tab = project.tabs.find((t) => t.tabId === req.params.tabId);
  if (!tab) throw new Error('Karban Project Tab Not Found');
  const filterKarbanProjectCards = tab.cards.filter(
    (c) => c.cardId !== req.params.cardId
  );
  tab.cards = filterKarbanProjectCards;
  await karban.save();
  res.json({ success: true, karban });
};
