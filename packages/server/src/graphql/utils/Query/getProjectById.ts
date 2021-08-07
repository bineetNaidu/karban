import Project, { ProjectDoc } from '../../../models/Project';

export const getProjectById = async (
  _parent: any,
  args: { id: string }
): Promise<ProjectDoc | null> => {
  const project = await Project.findOne({ _id: args.id })
    .populate('cards')
    .exec();
  if (!project) {
    return null;
  }
  return project;
};
