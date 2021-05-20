import Project, { ProjectDoc } from '../../../models/Project';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  id: string;
  data: {
    projectName: string;
    projectDescription: string;
  };
}

export const updateProject = async (
  parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<ProjectDoc> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const user = await ctx.getUser();
  const project = await Project.findOne({ _id: args.id });

  if (!project) {
    throw new Error('No Projects Found with the given ID!');
  }

  if (!user.projects.includes(project._id)) {
    throw new Error('Not Authorized to perform this task into this project!');
  }

  project.set(args.data);
  const updatedProject = await project.save();

  return updatedProject;
};
