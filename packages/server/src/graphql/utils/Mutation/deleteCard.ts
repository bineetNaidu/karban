import Project from '../../../models/Project';
import Tab, { TabDoc } from '../../../models/Tab';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  projectId: string;
  tabId: string;
  cardId: string;
}

export const deleteCard = async (
  parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<Boolean> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const user = await ctx.getUser();
  const project = await Project.findOne({ _id: args.projectId });
  const tab = await Tab.findOne({ _id: args.tabId });

  if (!project) {
    throw new Error('Project With the Given ID was not Found!');
  }

  if (!tab) {
    throw new Error('Tab With the Given ID was not Found!');
  }

  if (!user.projects.includes(project._id)) {
    throw new Error('Not Authorized to perform this task into this field!');
  }

  try {
    const deleteCardsCol = tab.cards.filter((c) => c._id != args.cardId);

    await tab.update({ $set: { cards: deleteCardsCol } });

    await tab.save();
    return true;
  } catch (error) {
    return false;
  }
};
