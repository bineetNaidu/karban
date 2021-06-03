import Project from '../../../models/Project';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  id: string;
}

export const deleteProject = async (
  _parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<boolean> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const user = await ctx.getUser();
  const project = await Project.findOne({ _id: args.id });

  if (!project) {
    throw new Error('No Projects Found with the given ID!');
  }

  if (!user!.projects.includes(project._id)) {
    throw new Error('Not Authorized to perform this task into this project!');
  }

  try {
    await user!.update({
      $pull: { projects: project._id },
    });

    await user!.save();

    await project.remove();
  } catch (error) {
    return false;
  }

  return true;
};
