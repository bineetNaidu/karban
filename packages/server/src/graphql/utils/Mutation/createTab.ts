import Project from '../../../models/Project';
import Tab, { TabDoc } from '../../../models/Tab';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  projectId: string;
  tabName: string;
}

export const createTab = async (
  parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<TabDoc> => {
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

  const tab = Tab.build({ tabName: args.tabName });

  await tab.save();

  project.tabs.push(tab._id);

  await project.save();

  return tab;
};
