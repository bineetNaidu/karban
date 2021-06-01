import Project from '../../../models/Project';
import Tab, { TabDoc } from '../../../models/Tab';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  projectId: string;
  tabId: string;
  cardBody: string;
}

export const createCard = async (
  parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<ReturnType<TabDoc['cards'] | any>> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const user = await ctx.getUser();
  const project = await Project.findOne({ _id: args.projectId });

  if (!project) {
    throw new Error('Project With the Given ID was not Found!');
  }

  if (!user.projects.includes(project._id)) {
    throw new Error('Not Authorized to perform this task into this field!');
  }

  const tab = await Tab.findOne({ _id: args.tabId });

  if (!tab) {
    throw new Error('Tab With the Given Tab ID was not Found!');
  }

  const card = await Tab.buildCard({ cardBody: args.cardBody });

  return card as any;
};
