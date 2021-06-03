import Project, { ProjectDoc } from '../../../models/Project';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  projectName: string;
  projectDescription: string;
}

export const createProject = async (
  _parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<ProjectDoc> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const project = Project.build({
    projectName: args.projectName,
    projectDescription: args.projectDescription,
  });

  await project.save();

  const user = await ctx.getUser();

  user!.projects.push(project._id);

  user!.save();

  return project;
};
